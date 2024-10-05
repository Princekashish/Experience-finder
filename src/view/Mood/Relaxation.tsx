import React, { useState } from "react";
import FormInput from "../../components/base/FormInput";
import FormButton from "../../components/base/FormButton";
import planningWithOptions, { AI_Prompt_Relaxation } from "../../lib/data";
import toast, {  Toaster } from "react-hot-toast";
import { chatSession } from "../../lib/Service/Aimodel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/config/Firebase";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/shared/Form/LoginForm";
import { CgSpinner } from "react-icons/cg";

const Relaxation: React.FC = () => {
  const [dialogbox, setDialogbox] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    place: "",
    people: "",
    planningWith: "",
    relaxationType: "",
    duration: "",
    budget: "500",
  });

  const navigate = useNavigate();

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

  // Check authentication and retrieve user UID from localStorage
  // useEffect(() => {
  //   const storedUID = localStorage.getItem("user_uid");
  //   if (storedUID) {
  //     setIsUser(true);
  //     setUserUID(storedUID);
  //   }
  // }, []);

  // Handle user authentication and save UID in state/localStorage
  // const handleAuth = (isAuthenticated: boolean, uid?: string | null) => {
  //   setIsUser(isAuthenticated);
  //   if (isAuthenticated && uid) {
  //     setUserUID(uid);
  //     localStorage.setItem("user", uid);
  //   } else {
  //     setUserUID(null);
  //     localStorage.removeItem("user");
  //   }
  // };

  // Generate relaxation plan if the user is authenticated
  const generatePlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    if (!user) {
      setDialogbox(true);
      return;
    }

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
      SaveAIData(result?.response?.text());
      console.log("==>", result?.response?.text());
      setLoading(false);
    } catch (error) {
      toast.error("Error generating plan.");
      console.error(error);
    }
  };

  const SaveAIData = async (AiData: any) => {
    setLoading(true);
    const docID = Date.now().toString();
    const uid = localStorage.getItem("user");

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

  return (
    <>
      {/* <AuthStatus onAuthChange={handleAuth} /> */}
      <div className="min-h-screen flex  flex-col justify-start items-start  pt-24">
        {dialogbox && <LoginForm onClose={() => setDialogbox(false)} />}
        <div className=" md:text-[2em] text-start   md:w-full">
          <h1 className="font-bold text-[1.8em] leading-none text-center mt-5 ">
            Adventure
          </h1>
        </div>
        <div className="flex  md:w-full p-5 md:justify-center">
          <form
            onSubmit={generatePlan}
            className="flex  flex-col gap-5 md:w-3/5"
          >
            <div className="flex flex-col gap-5">
              <h1>Where would you like to relax?</h1>
              <FormInput
                type="text"
                name="place"
                placeholder="🗺️ Location"
                value={formData.place}
                onChange={handleInputChange}
                className="px-3 py-3 border-[.3px] w-full  bg-black"
              />
            </div>

            {/* People Input */}
            <div className="flex flex-col gap-5">
              <h1>How many people will be joining you?</h1>
              <FormInput
                type="number"
                name="people"
                value={formData.people}
                onChange={handleInputChange}
                placeholder="🧑‍🤝‍🧑 Number of People"
                className="px-3 py-3 border-[.3px] w-full  bg-black"
              />
            </div>

            {/* Duration */}
            <div className=" flex flex-col gap-5">
              <h1>How long do you want to relax?</h1>
              <FormInput
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="px-3 w-full py-3 border-[.3px] bg-black"
                placeholder="⌚ Duration"
              />
            </div>

            {/* Budget Range */}
            <div className=" flex flex-col gap-5">
              <h1>What is your budget range?</h1>
              <input
                type="range"
                name="budget"
                min="0"
                max="5000"
                value={formData.budget}
                onChange={handleBudgetChange}
                className="w-full h-[2px] bg-gray-300 rounded-lg appearance-none duration-500 cursor-pointer   accent-blue-500"
              />
              <div>
                <span className="text-zinc-200 text-sm font-medium">
                  Rs. {formData.budget}
                </span>
              </div>
            </div>

            {/* Planning With */}
            <div className="w-full">
              <h1>Who Are You Planning With?</h1>
              <div className="grid grid-cols-4 gap-5 p-5">
                {planningWithOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setFormData({ ...formData, planningWith: item.value })
                    }
                    className={`flex flex-col h-[120px]  justify-center items-center rounded-xl shadow shadow-white cursor-pointer  ${
                      formData.planningWith === item.value
                        ? "border-white border-[1px]"
                        : ""
                    }`}
                  >
                    <h1>{item.label}</h1>
                    <h1>{item.value}</h1>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <FormButton
              type="submit"
              disabled={loading}
              className="focus:scale-110 hover:scale-110 hover:bg-zinc-900 active:scale-105 transition bg-zinc-900 px-3 py-3 w-full rounded-lg flex justify-center items-center"
              startIcon={
                loading ? <CgSpinner className="animate-spin" /> : null
              } // Show spinner when loading
            >
              {loading ? "Loading..." : "Generate Your Plan 🛫"}{" "}
              {/* Conditional label */}
            </FormButton>
          </form>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Relaxation;
