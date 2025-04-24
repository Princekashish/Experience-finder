import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../lib/config/Firebase";
import Information from "../info/Inforamtion";
import Details from "../info/Transport";
import Hotels from "../info/Hotels";
import Restaurants from "../info/Restrunts";
import Sightseeing from "../info/Sightseen";
import ScrollTop from "../../lib/ScrollTop";

const ViewExpresion: React.FC = () => {
  const [aiData, setAiData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) GetAiData(id);
  }, [id]);

  const GetAiData = async (id: string) => {
    setLoading(true);
    const docRef = doc(db, "AiData_Relax", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAiData(docSnap.data());
    } else {
      console.log("no data found");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-3xl w-1/3" />
        <div className="h-6 bg-gray-200 rounded-3xl w-2/3" />
        <div className="h-40 bg-gray-200 rounded-3xl" />
        <div className="h-10 bg-gray-200 rounded-3xl w-1/4" />
        <div className="h-6 bg-gray-200 rounded-3xl w-1/2" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <ScrollTop />
      <Information plan={aiData} />
      <Sightseeing plan={aiData} />
      <Details plan={aiData} />
      <Hotels plan={aiData} />
      <Restaurants plan={aiData} />
    </div>
  );
};

export default ViewExpresion;
