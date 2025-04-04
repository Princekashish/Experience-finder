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
import LoginForm from "../../components/shared/Form/LoginForm";
import ScrollTop from "../../lib/ScrollTop";

const Relaxation: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    place: "",
    people: "",
    planningWith: "",
    relaxationType: "",
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
      toast.error("You don't have enough credits. Please top up to generate a plan.");
      navigate("/payment");
      return;
    }

    // Validate form data
    if (
      (Number(formData.duration) > 10 && !formData.place) ||
      !formData.duration ||
      !formData.planningWith ||
      !formData.budget
    ) {
      toast.error("All Fields are Required.");
      setLoading(false);
      return;
    }

    setLoading(true);

    // Create AI prompt and get the plan
    const FINAL_PROMPT = AI_Prompt_Relaxation.replace(
      "{location}",
      formData.place
    )
      .replace("{duration}", formData.duration)
      .replace("{goingWith}", formData.planningWith)
      .replace("{price}", formData.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
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

    // Save the cleaned and parsed data to Firestore
    await setDoc(doc(db, "AiData_Relax", docID), {
      userSelected: formData,
      AiDatas: JSON.parse(AiData),
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
        <div className="md:text-[2em] xl:text-start md:w-full flex flex-col justify-center items-center gap-3 w-full">
          <h1 className="font-bold text-[1.8em] leading-none text-center mt-5">
            Adventure
          </h1>
          <p className="xl:text-lg text-sm tracking-wider text-center">
            Plan your Adventure day using AI
          </p>
        </div>
        <div className="flex md:w-full p-5 md:justify-center justify-center w-full">
          <form
            onSubmit={generatePlan}
            className="flex flex-col w-full gap-5 md:w-3/5"
          >
            <div className="flex flex-col gap-5">
              <h1>Where would you like to go?</h1>
              <FormInput
                type="text"
                name="place"
                placeholder="🗺️ Location"
                value={formData.place}
                onChange={handleInputChange}
                className="px-3 py-3 border-[.3px] w-full border-zinc-300 bg-black"
              />
            </div>

            <div className="flex flex-col gap-5">
              <h1>How many people will be joining you?</h1>
              <FormInput
                type="number"
                name="people"
                value={formData.people}
                onChange={handleInputChange}
                placeholder="🧑‍🤝‍🧑 Number of People"
                className="px-3 py-3 border-[.3px] w-full border-zinc-300 bg-black"
              />
            </div>

            <div className="flex flex-col gap-5">
              <h1>How long do you want to relax?</h1>
              <FormInput
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="px-3 w-full py-3 border-[.3px] border-zinc-300 bg-black"
                placeholder="⌚ Duration or Days"
              />
            </div>

            <div className="flex flex-col gap-5">
              <h1>What is your budget range?</h1>
              <input
                type="range"
                name="budget"
                min="0"
                max="10000"
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
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 p-5">
                {planningWithOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setFormData({ ...formData, planningWith: item.value })
                    }
                    className={`flex flex-col h-[120px] justify-center items-center rounded-xl shadow shadow-white cursor-pointer ${
                      formData.planningWith === item.value
                        ? "border-zinc-300 bg-black border-[1px]"
                        : ""
                    }`}
                  >
                    <h1>{item.label}</h1>
                    <h1>{item.value}</h1>
                  </div>
                ))}
              </div>
            </div>

            <FormButton
              type="submit"
              disabled={loading}
              className="hover:bg-zinc-900 bg-zinc-900 px-3 py-3 w-full rounded-lg flex justify-center items-center text-white "
              startIcon={loading ? <CgSpinner className="animate-spin" /> : null}
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
