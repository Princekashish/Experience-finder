import React from "react";
import FlexCard from "../../components/custom/FlexCard";

const AI: React.FC = () => {
  return (
    <div className="font-intra ">
      <div className="flex justify-center items-center p-5">
        <h1 className="font-bold text-[1.8em] leading-none">
          Your <span className="text-[#C8A0FF]">AI-Powered</span> Finder
        </h1>
      </div>
      <div className="flex justify-start p-5 mt-6">
        <div className="flex flex-col gap-5">
          <FlexCard
            label="Discover Tailored Adventures"
            className="bg-[#DCFFA0] w-1/4 font-bold text-[22.5px]"
          />
          <div className="flex flex-col justify-center md:justify-around md:flex-row md:p-10 md:gap-10  items-center gap-5 ">
            <FlexCard
              label="Craft the perfect experience with Experience Finder. Whether you're looking to relax, get fit, explore, or learn something new, our intelligent system takes your preferences into account and presents you with the most optimal recommendations for a day well spent."
              className="text-[#616161]   w-1/3"
            />
            <FlexCard imageUrl="/Adventure.webp" className="md:w-[330px]  rounded-2xl"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;
