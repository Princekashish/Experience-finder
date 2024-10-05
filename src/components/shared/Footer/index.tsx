import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="h-[30vh]  mt-6  p-5 flex flex-col justify-between ">
      <div className="flex justify-between  p-5">
        <div className="flex flex-col justify-start ">
          <img src="/logo-black.png" alt="" className="w-[320px]" />
        </div>
        <div className="flex  gap-10 mr-[10%]">
          <div className="text-base text-[#616161] space-y-5">
            <h1 className="text-[1.2em] font-bold text-black">Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
          </div>
          <div className="text-base text-[#616161] space-y-5">
            <h1 className="text-[1.2em] font-bold text-black">Connect</h1>
            <h1>Home</h1>
            <h1>Home</h1>
          </div>
          <div className="text-base text-[#616161] space-y-5">
            <h1 className="text-[1.2em] font-bold text-black">Support</h1>
            <h1>Home</h1>
            <h1>Home</h1>
          </div>
        </div>
      </div>
      <div className="text-center text-sm ">
        <h1>All Copyright are reserved by Prince Kashish © 2024 </h1>
      </div>
    </div>
  );
};

export default Footer;
