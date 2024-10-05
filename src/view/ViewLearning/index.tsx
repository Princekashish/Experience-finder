import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../lib/config/Firebase";
import LearningInfo from "../info/LearningInfo";
import LearingDetail from "../info/LearingDetail";

const ViewLearning: React.FC = () => {
  const [aiData, setAiData] = useState<any>();
  const { id } = useParams();
  useEffect(() => {
    if (id) GetAiData(id);
  }, [id]);

  const GetAiData = async (id: string) => {
    const docRef = doc(db, "AiData_Learning", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAiData(docSnap.data());
      
    } else {
      console.log("no data found");
    }
  };
  console.log(aiData);

  return (
    <div className="">
        <LearningInfo LearingData={aiData}/>
        {aiData?.AiDatas && (
        <LearingDetail topicSequence={aiData.AiDatas.topicSequence} />
      )}
      
    </div>
  );
};

export default ViewLearning;
