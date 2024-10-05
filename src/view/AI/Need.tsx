import React from "react";
const Need: React.FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center  mt-6 font-intra p-5 gap-10 ">
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="leading-none  text-[#C8A0FF] text-[1.2em]">Why Choose Us?</h1>
          <p className="text-center text-[2em] font-extrabold xl:text-[3em]">
            The only tool youll ever need!.
          </p>
          <p className="text-center text-sm xl:text-base text-[#616161]">
            A small section highlighting the value of using Experience Finder
            over others.
          </p>
        </div>
       <div className="grid xl:grid-cols-3 grid-cols-1 gap-5  p-24 ">
       <div className="border h-[160px] xl:h-[180px] text-center flex justify-center items-center flex-col rounded-2xl p-5 gap-2">
            <h1 className="font-bold text-xl">AI-Powered</h1>
            <p className="text-[#616161] ">Personalized recommendations based on your preferences.</p>

        </div>
        <div className="border h-[160px] xl:h-[180px] text-center flex justify-center items-center flex-col rounded-2xl p-5 gap-2">
            <h1 className="font-bold text-xl">Diverse Experiences</h1>
            <p  className="text-[#616161] ">From quiet retreats to thrilling adventures.</p>

        </div>
        <div className="border h-[160px] xl:h-[180px] text-center flex justify-center items-center flex-col rounded-2xl p-5 gap-2">
            <h1 className="font-bold text-xl">Easy Planning</h1>
            <p className="text-[#616161] ">Get geo-coordinates, timings, and prices—all in one place.</p>

        </div>
       </div>
      </div>
    </>
  );
};
export default Need;
