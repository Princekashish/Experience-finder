import React from "react";
import FlexCard from "../../components/custom/FlexCard";

const AI: React.FC = () => {
  return (
    <div className="font-intra ">
      <div className="flex justify-center items-center p-5">
        <h1 className="font-bold text-[1.8em] leading-none xl:text-[3em]">
          Your <span className="text-[#C8A0FF] ">AI-Powered</span> Finder
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 p-5 ">
        <div className="flex flex-col justify-start items-start gap-5">
          <div className="flex flex-col gap-5">
            <FlexCard
              label="Discover Adventures"
              className="bg-[#DCFFA0] text-black flex flex-wrap w-60 font-bold text-[22.5px]"
            />
          </div>
          <div className="flex flex-col  justify-center xl:items-center xl:w-full  md:justify-around md:flex-row md:p-10 md:gap-10  items-center gap-5 ">
            <FlexCard
              label="Craft the perfect experience with Experience Finder. Whether you're looking to relax, get fit, explore, or learn something new, our intelligent system takes your preferences into account and presents you with the most optimal recommendations for a day well spent."
              className="text-[#616161]  w-1/2 "
            />
            <FlexCard imageUrl="/DiscoverTailored -Photoroom.png" className="xl:w-[420px]  " />
          </div>
          <div className="flex flex-col gap-5">
            <FlexCard
              label="Seamlessly Planned"
              className="bg-[#DCFFA0] text-black flex flex-wrap w-60 font-bold text-[22.5px]"
            />
          </div>
          <div className="flex flex-col justify-center xl:items-center xl:w-full md:justify-around md:flex-row-reverse md:p-10 md:gap-10  items-center gap-5 ">
            <FlexCard
              label="With Experience Finder, you get more than just recommendations. Our AI provides all the details you need—exact geo-coordinates, pricing, timing, and any special requirements—so you can step into the day fully prepared."
              className="text-[#616161]   w-1/2"
            />
            <FlexCard imageUrl="/SeamlesslyPlanned-Photoroom.png" className="xl:w-[420px]  " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;
