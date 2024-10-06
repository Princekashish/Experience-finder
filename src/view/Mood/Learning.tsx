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

const Learning: React.FC = () => {
  const [dialogbox, setDialogbox] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [learningData, setLearningData] = useState({
    subject: "",
    month: "",
    hourperday: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLearningData({ ...learningData, [name]: value });
    console.log(learningData);
  };

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
      Number(learningData.subject) ||
      !learningData.month ||
      !learningData.hourperday
    ) {
      toast.error("All Fields are Required.");
      setLoading(false);
      return;
    }
    setLoading(true);
    // Create AI prompt and get the plan
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

    // Save the cleaned and parsed data to Firestore
    await setDoc(doc(db, "AiData_Learning", docID), {
      userSelected: learningData,
      AiDatas: JSON.parse(AiData),
      user: uid,
      id: docID,
    });
    setLoading(false);

    navigate(`/dashboard/Learning/${docID}`);
  };
  return (
    <div>
      <>
        {/* <AuthStatus onAuthChange={handleAuth} /> */}
        <div className=" flex  flex-col justify-start items-start  ">
          {dialogbox && <LoginForm onClose={() => setDialogbox(false)} />}
          <div className=" md:text-[2em] xl:text-start text-center w-full   md:w-full">
            <h1 className="font-bold text-[1.8em] leading-none text-center mt-5 ">
              Learning Plan
            </h1>
          </div>
          <div className="flex  md:w-full p-5 md:justify-center">
            <form
              onSubmit={generatePlan}
              className="flex  flex-col gap-5 md:w-3/5"
            >
              <div className="flex flex-col gap-5">
                <h1>What subject(s) do you want to study?</h1>
                <FormInput
                  type="text"
                  name="subject"
                  placeholder="Topic name"
                  value={learningData.subject}
                  onChange={handleInputChange}
                  className="px-3 py-3 border-[.3px] w-full  border-black"
                />
              </div>

              {/* People Input */}
              <div className="flex flex-col gap-5">
                <h1>Over how many months do you plan to study?</h1>
                <FormInput
                  type="text"
                  name="month" // Corrected name from "people" to "month"
                  value={learningData.month}
                  onChange={handleInputChange}
                  placeholder="For Exam or For Months"
                  className="px-3 py-3 border-[.3px] w-full  border-black"
                />
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-5">
                <h1>How many hours will you dedicate to studying per day?</h1>
                <FormInput
                  type="text"
                  name="hourperday" // Corrected name from "duration" to "hourperday"
                  value={learningData.hourperday}
                  onChange={handleInputChange}
                  className="px-3  py-3 border-[.3px] w-full  border-black"
                  placeholder="Example: 2 hours, 3 hours"
                />
              </div>
              {/* Submit Button */}
              <FormButton
                type="submit"
                disabled={loading}
                className="bg-black hover:bg-zinc-900  px-3 py-3 w-full text-white rounded-lg flex justify-center items-center"
                startIcon={
                  loading ? <CgSpinner className="animate-spin" /> : null
                }
              >
                {loading ? "Loading..." : "Generate Your Plan"}{" "}
              </FormButton>
            </form>
          </div>
          <Toaster />
        </div>
      </>
    </div>
  );
};

export default Learning;
