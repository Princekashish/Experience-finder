import React from "react";
import FlexCard from "../../components/custom/FlexCard";
import { useNavigate } from "react-router-dom";

const Expresion: React.FC = () => {
  const navigate = useNavigate();
  const navigatemood = (mood: string) => {
    navigate(`/dashboard/${mood}`);
  };

  return (
    <div className="flex flex-col justify-center items-center p-5  font-intraz h-3/4 md:h-[70vh]">
      {/* <div className=" flex justify-center items-center flex-col ">
        <h1 className="xl:text-[3em] text-[1.5em] font-bold ">
          Diverse <span className="text-[#C8A0FF]">Experience Modes</span>
        </h1>
        <p className="text-[#616161] text-base"> Explore a variety of modes</p>
      </div> */}
      <div className="grid grid-cols-1  gap-5 md:grid-cols-none md:grid-rows-none md:flex xl:gap-10">
      
        <div
          onClick={() => navigatemood("learning")}
          className="cursor-pointer hover:scale-110 transform duration-300 ease-in-out h-[230px] w-[260px] rounded-xl flex justify-center items-center shadow-md bg-[url('https://images.unsplash.com/photo-1599249300675-c39f1dd2d6be?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-center"
        >
           <div className="absolute inset-0 bg-black/75 opacity-50 rounded-xl flex justify-center items-center">
          <FlexCard label="Learing"  className="text-white  font-bold text-2xl"/>
          </div>
          
        </div>
       
        <div
          onClick={() => navigatemood("relaxation")}
          className="cursor-pointer hover:scale-110 transform duration-300 ease-in-out h-[230px] w-[260px] rounded-xl flex justify-center items-center shadow-md bg-[url('https://images.unsplash.com/photo-1489914169085-9b54fdd8f2a2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-center"
        >
           <div className="absolute inset-0 bg-black/75 opacity-50 rounded-xl flex justify-center items-center">
          <FlexCard label="Adventure" className="text-white font-bold   text-2xl" />
          </div>
        </div>
        {/* <div
          onClick={() => navigatemood("relaxation")}
          className="cursor-pointer hover:scale-110 transform duration-300 ease-in-out h-[230px] w-[260px] rounded-xl flex justify-center items-center shadow-md bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2202&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-center"
        >
          <FlexCard label="Fitness"  className="text-white  font-bold"/>
        </div> */}
        
      </div>
    </div>
  );
};

export default Expresion;
