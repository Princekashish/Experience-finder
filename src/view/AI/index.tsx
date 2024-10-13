import React from "react";
import FlexCard from "../../components/custom/FlexCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const AI: React.FC = () => {
  useGSAP(() => {
    gsap.to("#aitxt", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.45,
      scrollTrigger: {
        trigger: "#aitxt",
        toggleActions: "play none none reverse",
      },
      ease: "power2.inOut",
    });
    gsap.to("#xycard", {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#xycard",
        toggleActions: "restart play none  reverse",
      },
      ease: "power2.inOut",
    });
    gsap.to("#xzcard", {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#xzcard",
        toggleActions: "restart reverse restart reverse",
      },
      ease: "power2.inOut",
    });
  }, []);
  return (
    <div className="font-intra ">
      <div className="flex justify-center items-center p-5">
        <h1 id="aitxt" className="font-bold text-[1.8em] leading-none xl:text-[3em] opacity-0 translate-y-10">
          Your <span className="text-[#C8A0FF] ">AI-Powered</span> Finder
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 p-5 ">
        <div className=" flex flex-col justify-start items-start gap-5">
          <div id="xycard" className=" xl:p-10 opacity-0 translate-y-10">
            <div className="flex flex-col gap-5">
              <FlexCard
                label="Discover Adventures"
                className="text-zinc-400 flex flex-wrap w-60 font-bold text-[22.5px]"
              />
            </div>
            <div className=" flex flex-col b  justify-center xl:items-center xl:w-full  md:justify-around md:flex-row md:p-10 md:gap-10  items-center gap-5 ">
              <FlexCard
                label="Craft the perfect experience with Experience Finder. Whether you're looking to relax, get fit, explore, or learn something new, our intelligent system takes your preferences into account and presents you with the most optimal recommendations for a day well spent."
                className="text-[#616161]  xl:w-1/2  xl:text-xl"
              />
              <FlexCard
                imageUrl="/DiscoverTailored -Photoroom.png"
                className="xl:w-[420px]  border border-zinc-500 p-5 rounded-2xl"
              />
            </div>
          </div>
          {/* //newww are */}
          <div id="xzcard" className=" xl:p-10 opacity-0 translate-y-10">
            <div className="flex flex-col gap-5">
              <FlexCard
                label="Seamlessly Planned"
                className="text-zinc-400 flex flex-wrap w-60 font-bold text-[22.5px]"
              />
            </div>
            <div className=" flex flex-col xl:flex-row-reverse  justify-center xl:items-center xl:w-full  md:justify-around md:flex-row md:p-10 md:gap-10  items-center gap-5 ">
              <FlexCard
                label="With Experience Finder, you get more than just recommendations. Our AI provides all the details you need—exact geo-coordinates, pricing, timing, and any special requirements—so you can step into the day fully prepared."
                className="text-[#616161]  xl:w-1/2  xl:text-xl"
              />
              <FlexCard
                imageUrl="/SeamlesslyPlanned-Photoroom.png"
                className="xl:w-[420px] border border-zinc-500 p-5 rounded-2xl "
              />
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default AI;
