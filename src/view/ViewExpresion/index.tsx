import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../lib/config/Firebase";
import Information from "../info/Inforamtion";
import Details from "../info/Details";

const ViewExpresion: React.FC = () => {
  const [aiData, setAiData] = useState<any>();
  const { id } = useParams();
  useEffect(() => {
    if (id) GetAiData(id);
  }, [id]);

  const GetAiData = async (id: string) => {
    const docRef = doc(db, "AiData_Relax", id);
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
      <Information relation={aiData}/>
      <Details plan={aiData}/>
    </div>
  );
};

export default ViewExpresion;
