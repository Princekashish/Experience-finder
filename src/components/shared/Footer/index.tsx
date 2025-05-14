import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="xl:h-[30vh] mt-6  p-5 flex flex-col justify-between  ">
      <div className="flex justify-between flex-col xl:flex-row  p-5">
        <div className="flex flex-col ">
          <img src="/Untitled design.png" alt="" className="xl:w-[320px] " />
        </div>
        <div className="flex flex-col  xl:flex-row gap-10 xl:mr-[10%] mt-5 xl:mt-0 ">
          <div className="text-base text-[#616161]  flex flex-col justify-start gap-3">
            <h1 className="text-[1.2em] font-bold ">Itineraries</h1>
            <div className="flex flex-col  gap-2">
            <Link to={'/dashboard/learning'} className="flex justify-start items-center gap-1">Learing Path <GoArrowUpRight size={15} color="#C8A0FF"/></Link>
            <Link to={'/dashboard/relaxation'} className="flex justify-start items-center gap-1">Adventure <GoArrowUpRight size={15} color="#C8A0FF"/></Link>
            
            </div>
          </div>
          <div className="text-base text-[#616161] flex flex-col justify-start gap-3 ">
            <h1 className="text-[1.2em] font-bold ">Legal</h1>
            <h1>Terms and conditions</h1>
            <h1>Privacy Policy</h1>
          </div>
          <div className="text-base text-[#616161] flex flex-col justify-start gap-3">
            <h1 className="text-[1.2em] font-bold ">Support</h1>
            <h1>Contact us</h1>
          </div>
        </div>
      </div>
      <div className="text-center xl:text-sm text-xs text-zinc-400">
        <h1> © {new Date().getFullYear()} Prince Kashish. All rights reserved. </h1>
      </div>
    </div>
  );
};

export default Footer;




