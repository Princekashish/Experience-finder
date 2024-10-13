import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
const Need: React.FC = () => {
  useGSAP(() => {
    gsap.to("#ntxt", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.20,
      scrollTrigger: {
        trigger: "#ntxt",
        toggleActions: "restart play none  reverse",
      },
      ease: "power2.inOut",
    });
    gsap.to("#cardxy", {
      opacity: 1,
      y: 0,
      duration: 1,
        scrollTrigger: {
        trigger: "#cardxy",
        toggleActions: "restart reverse restart reverse",
      },
      ease: "power2.inOut",
    });
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center  mt-6 font-intra p-5 gap-10 ">
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 id="ntxt" className="leading-none  text-[#C8A0FF] text-[1.2em] opacity-0 translate-y-10">Why Choose Us?</h1>
          <p id="ntxt" className="text-center text-[2em] text-zinc-200 font-extrabold xl:text-[3em] opacity-0 translate-y-10">
            The only tool youll ever need!.
          </p>
          <p id="ntxt" className="text-center text-sm xl:text-base text-[#616161] opacity-0 translate-y-10">
            A small section highlighting the value of using Experience Finder
            over others.
          </p>
        </div>
       <div id="cardxy" className="grid xl:grid-cols-3 grid-cols-1 gap-10  xl:p-24 opacity-0 translate-y-10 ">
       <div className="border border-zinc-600 h-[160px] xl:h-[180px] text-center flex justify-center items-center flex-col rounded-2xl p-5 gap-2">
            <h1 className="font-bold text-xl text-zinc-300">AI-Powered</h1>
            <p className="text-[#616161] ">Personalized recommendations based on your preferences.</p>

        </div>
        <div className="border border-zinc-600 h-[160px] xl:h-[180px] text-center flex justify-center items-center flex-col rounded-2xl p-5 gap-2">
            <h1 className="font-bold text-xl  text-zinc-300">Diverse Experiences</h1>
            <p  className="text-[#616161] ">From quiet retreats to thrilling adventures.</p>

        </div>
        <div className="border border-zinc-600 h-[160px] xl:h-[180px] text-center flex justify-center items-center flex-col rounded-2xl p-5 gap-2">
            <h1 className="font-bold text-xl text-zinc-300">Easy Planning</h1>
            <p className="text-[#616161] ">Get geo-coordinates, timings, and prices—all in one place.</p>

        </div>
       </div>
      </div>
    </>
  );
};
export default Need;
