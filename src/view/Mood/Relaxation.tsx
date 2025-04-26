import React, { useState, useEffect } from "react";
import FormInput from "../../components/base/FormInput";
import FormButton from "../../components/base/FormButton";
import planningWithOptions, { AI_Prompt_Relaxation } from "../../lib/data";
import toast, { Toaster } from "react-hot-toast";
import { chatSession } from "../../lib/Service/Aimodel";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../lib/config/Firebase";
import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import AuthStatus from "../../components/custom/AuthStatus";
import ScrollTop from "../../lib/ScrollTop";
import LocationAutocomplete from "../../components/custom/Auto";

const Relaxation: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fromLocation: "",
    toLocation: "",
    people: "",
    planningWith: "",
    duration: "",
    budget: "1000",
  });
  const [usercredits, setUsercredits] = useState<number>(0);

  const navigate = useNavigate();

  // Check if the user is logged in and fetch credits if logged in
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/auth/login");
    } else {
      setIsAuthenticated(true);
      setUserEmail(user.email);
      checkUsercredits(user.uid);
    }
  }, [navigate]);

  const checkUsercredits = async (uid: string) => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setUsercredits(userData?.credits || 0);
    } else {
      await setDoc(userDocRef, { credits: 10 }); // Initial credits if not set
      setUsercredits(10); // Default to 10 credits
    }
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle budget range input
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, budget: e.target.value });
  };

  // Generate relaxation plan if the user is authenticated
  const generatePlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("You need to log in to generate a plan.");
      return;
    }

    if (usercredits < 5) {
      toast.error(
        "You don't have enough credits. Please top up to generate a plan."
      );
      navigate("/payment");
      return;
    }

    // Validate form data
    if (
      !formData.fromLocation ||
      !formData.toLocation ||
      !formData.duration ||
      !formData.planningWith ||
      !formData.budget ||
      !formData.people
    ) {
      toast.error("All Fields are Required.");
      setLoading(false);
      return;
    }

    setLoading(true);

    // Create AI prompt and get the plan
    const FINAL_PROMPT = AI_Prompt_Relaxation.replace(
      "{fromLocation}",
      formData.fromLocation
    )
      .replace("{toLocation}", formData.toLocation)
      .replace("{duration}", formData.duration)
      .replace("{people}", formData.people)
      .replace("{goingWith}", formData.planningWith)
      .replace("{budget}", formData.budget);

    // console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const aiResponse = result?.response?.text();
      // console.log(aiResponse);
      await SaveAIData(result?.response?.text());
      await deductcredits(); // Deduct 5 credits after generating the plan
      setLoading(false);
    } catch (error) {
      toast.error("Error generating plan.");
      console.error(error);
      setLoading(false);
    }
  };

  const SaveAIData = async (AiData: any) => {
    setLoading(true);
    const docID = Date.now().toString();
    const uid = auth.currentUser?.uid;
    let parsedAiData;

    try {
      const cleanedAiData = AiData.replace(/```json|```/g, "").trim();
      parsedAiData = JSON.parse(cleanedAiData); // Attempt to parse it as JSON
    } catch (error) {
      // If it's not valid JSON, treat it as plain text
      console.warn("AI data is not valid JSON, storing as plain text.", error);
      parsedAiData = { text: AiData }; // Store the plain text in a JSON format
    }

    // console.log("Data to be saved:", {
    //   userSelected: formData,
    //   AiDatas: parsedAiData,
    //   user: uid,
    //   id: docID,
    // });

    // Save the cleaned and parsed data to Firestore
    await setDoc(doc(db, "AiData_Relax", docID), {
      userSelected: formData,
      AiDatas: parsedAiData,
      user: uid,
      id: docID,
    });
    setLoading(false);
    navigate(`/dashboard/${docID}`);
  };

  const deductcredits = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        credits: usercredits - 5, // Deduct 5 credits
      });
      setUsercredits(usercredits - 5); // Update local state
    }
  };

  const handleAuthChange = (
    isAuthenticated: boolean,
    userEmail?: string | null
  ) => {
    setIsAuthenticated(isAuthenticated);
    if (userEmail !== undefined) {
      setUserEmail(userEmail);
    } else {
      setUserEmail(null);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start">
        <AuthStatus onAuthChange={handleAuthChange} />
        <ScrollTop />
        <h1 className="hidden">{userEmail}</h1>
        <div className="md:text-[2em] xl:text-start md:w-full flex flex-col justify-center items-center gap-3 w-full mt-8">
          <h1 className="font-bold text-[1.8em] leading-none text-center mt-5">
            Adventure Planner
          </h1>
          <p className="xl:text-lg text-sm tracking-wider text-center hidden md:block">
            Plan your thrilling outdoor adventure using AI
          </p>
        </div>
        <div className="flex md:w-full p-5 md:justify-center justify-center w-full mt-5">
          <form
            onSubmit={generatePlan}
            className="flex flex-col w-full gap-5 md:w-3/5"
          >
            <div className="flex flex-col gap-5">
              <h1>Where would you like to go?</h1>
              <div className="flex gap-3">
                <LocationAutocomplete
                  name="fromLocation"
                  placeholder="🗺️ From Location"
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  className="px-3 py-3  bg-white/10  w-full border-zinc-300 outline-none  rounded-2xl "
                />

                <LocationAutocomplete
                  name="toLocation"
                  placeholder="🗺️ To Location"
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  className="px-3 py-3  bg-white/10 w-full border-zinc-300 outline-none  rounded-2xl  "
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h1>How many people will be joining you?</h1>
              <FormInput
                type="number"
                name="people"
                value={formData.people}
                onChange={handleInputChange}
                placeholder="🧑‍🤝‍🧑 Number of People"
                className="px-3 py-3  w-full border-zinc-300 bg-white/10"
              />
            </div>

            <div className="flex flex-col gap-5">
              <h1>How long do you want to relax?</h1>
              <FormInput
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="px-3 w-full py-3  border-zinc-300 bg-white/10 "
                placeholder="⌚ Duration or Days"
              />
            </div>

            <div className="flex flex-col gap-5">
              <h1>What is your budget range?</h1>
              <input
                type="range"
                name="budget"
                min="0"
                max="50000"
                value={formData.budget}
                onChange={handleBudgetChange}
                className="w-full h-[2px] bg-gray-300 rounded-lg appearance-none duration-500 cursor-pointer accent-blue-500"
              />
              <div>
                <span className="text-zinc-300 text-sm font-medium">
                  Rs. {formData.budget}
                </span>
              </div>
            </div>

            <div className="w-full">
              <h1>Who Are You Planning With?</h1>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-3">
                {planningWithOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setFormData({ ...formData, planningWith: item.value })
                    }
                    className={`flex gap-2 justify-center items-center bg-white/10 rounded-3xl py-2 cursor-pointer ${
                      formData.planningWith === item.value
                        ? "border-yellow-600  border-[1px]"
                        : ""
                    }`}
                  >
                    <h1>{item.label}</h1>
                    <h1>{item.value}</h1>
                  </div>
                ))}
              </div>
            </div>
            <p className=" text-sm text-gray-500 ">
              <span className="text-red-600">5 coin will deduct</span>
            </p>
            <FormButton
              type="submit"
              disabled={loading}
              className="hover:bg-zinc-900 bg-zinc-900  py-3 w-full  rounded-xl flex justify-center items-center text-white "
              startIcon={
                loading ? <CgSpinner className="animate-spin" /> : null
              }
            >
              {loading ? "Loading..." : "Generate Your Plan 🛫"}
            </FormButton>
          </form>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Relaxation;
