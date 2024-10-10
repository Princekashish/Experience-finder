import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AI_Prompt_Learning } from "../../lib/data";
import { chatSession } from "../../lib/Service/Aimodel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/config/Firebase";
import LoginForm from "../../components/shared/Form/LoginForm";
import FormInput from "../../components/base/FormInput";
import FormButton from "../../components/base/FormButton";
import { CgSpinner } from "react-icons/cg";
import AuthStatus from "../../components/custom/AuthStatus";

const Learning: React.FC = () => {
  const [dialogbox, setDialogbox] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [learningData, setLearningData] = useState({
    subject: "",
    month: "",
    hourperday: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLearningData({ ...learningData, [name]: value });
  };

  const generatePlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("You need to log in to generate a plan.");
      setDialogbox(true);
      return;
    }

    if (
      !learningData.subject ||
      !learningData.month ||
      !learningData.hourperday
    ) {
      toast.error("All Fields are Required.");
      setLoading(false);
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_Prompt_Learning.replace(
      "{Subject}",
      learningData.subject
    )
      .replace("{months}", learningData.month)
      .replace("{hours}", learningData.hourperday);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      SaveAIData(result?.response?.text());
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

    await setDoc(doc(db, "AiData_Learning", docID), {
      userSelected: learningData,
      AiDatas: JSON.parse(AiData),
      user: uid,
      id: docID,
    });
    setLoading(false);
    navigate(`/dashboard/Learning/${docID}`);
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
  console.log(userEmail);
  

  return (
    <div>
      <AuthStatus onAuthChange={handleAuthChange} />
      <div className="flex flex-col justify-start items-start">
        {dialogbox && (
          <LoginForm
            onAuthChange={handleAuthChange}
            onClose={() => setDialogbox(false)}
          />
        )}
        <div className="md:text-[2em] xl:text-start text-center w-full md:w-full">
          <h1 className="font-bold text-[1.8em] leading-none text-center mt-5">
            Learning Plan
          </h1>
          
        </div>
        <div className="flex md:w-full p-5 md:justify-center">
          <form
            onSubmit={generatePlan}
            className="flex flex-col gap-5 md:w-3/5"
          >
            {/* Form inputs */}
            <div className="flex flex-col gap-5">
              <h1>What subject(s) do you want to study?</h1>
              <FormInput
                type="text"
                name="subject"
                placeholder="Topic name"
                value={learningData.subject}
                onChange={handleInputChange}
                className="px-3 py-3 border-[.3px] w-full border-black"
              />
            </div>
            <div className="flex flex-col gap-5">
              <h1>Over how many months do you plan to study?</h1>
              <FormInput
                type="text"
                name="month"
                value={learningData.month}
                onChange={handleInputChange}
                placeholder="For Exam or For Months"
                className="px-3 py-3 border-[.3px] w-full border-black"
              />
            </div>
            <div className="flex flex-col gap-5">
              <h1>How many hours will you dedicate to studying per day?</h1>
              <FormInput
                type="text"
                name="hourperday"
                value={learningData.hourperday}
                onChange={handleInputChange}
                className="px-3 py-3 border-[.3px] w-full border-black"
                placeholder="Example: 2 hours, 3 hours"
              />
            </div>
            <FormButton
              type="submit"
              disabled={loading}
              className="bg-black hover:bg-zinc-900 px-3 py-3 w-full text-white rounded-lg flex justify-center items-center"
              startIcon={
                loading ? <CgSpinner className="animate-spin" /> : null
              }
            >
              {loading ? "Loading..." : "Generate Your Plan"}
            </FormButton>
          </form>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Learning;
