import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="xl:h-[30vh] mt-6  p-5 flex flex-col justify-between  ">
      <div className="flex justify-between flex-col xl:flex-row  p-5">
        <div className="flex flex-col justify-start border-b ">
          <img src="/logo-black.png" alt="" className="xl:w-[320px] " />
        </div>
        <div className="flex flex-col xl:flex-row gap-10 xl:mr-[10%] mt-5 xl:mt-0 ">
          <div className="text-base text-[#616161] space-y-5">
            <h1 className="text-[1.2em] font-bold text-black">Itineraries</h1>
            <h1>Adventure</h1>
            <h1>Learing Path</h1>
            <h1>Fitness guid</h1>
          </div>
          <div className="text-base text-[#616161] space-y-5 ">
            <h1 className="text-[1.2em] font-bold text-black">Legal</h1>
            <h1>Terms and conditions</h1>
            <h1>Privacy Policy</h1>
          </div>
          <div className="text-base text-[#616161] space-y-5">
            <h1 className="text-[1.2em] font-bold text-black">Support</h1>
            <h1>Contact us</h1>
          </div>
        </div>
      </div>
      <div className="text-center xl:text-sm text-xs ">
        <h1>All Copyright are reserved by Prince Kashish © 2024 </h1>
      </div>
    </div>
  );
};

export default Footer;
