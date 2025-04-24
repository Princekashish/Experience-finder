import React, { useEffect } from "react";
import FormButton from "../../components/base/FormButton";
import { Telescope } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface heroSubmit {
  handleSubmit?: () => void;
}

const HomePage: React.FC<heroSubmit> = ({ handleSubmit }) => {
  useGSAP(() => {
    gsap.fromTo(
      "#hbtn",
      { y: 0 },
      {
        y: -10,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      }
    );
    gsap.to("#txt", {
      opacity: 1,

      stagger: 0.25,
      ease: "power2.inOut",
    });
  }, []);

  useEffect(() => {
    const cursorBall = document.getElementById("cursorBall");

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorBall) {
        gsap.to(cursorBall, {
          x: e.clientX,
          y: e.clientY,
          duration: 1,

          ease: "power1.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div>
      {/* <div
        id="cursorBall"
        className="fixed w-3 h-3 bg-white rounded-full pointer-events-none  "
        style={{ transform: "translate(-50%, -50%)", zIndex: 1000 }}
      /> */}
      <section className="overflow-hidden h-[75vh] md:h-[90vh] flex flex-col xl:gap-10 md:flex-row justify-center items-center text-center px-6 font-intra">
        <div className=" md:w-3/2">
          <div className=" ">
            <h1
              id="txt"
              className="text-5xl font-bold mb-4 md:leading-[60px] hidden md:block opacity-0 "
            >
              Discover Transformative <span>AI Experiences</span> <br /> That
              Truly Speak to Your Soul and <br />{" "}
              <span className="text-[#c2abe3]">Ignite Your Imagination</span>
            </h1>
            <h1 className="text-5xl font-bold mb-4 leading-[50px]  block md:hidden">
              Discover <span className="text-[#C8A0FF]">AI</span> Experiences
              That Speak to Your Soul
            </h1>
            <p className="text-lg mb-6 text-[#616161]">
              From relaxation to adventure, find tailored activities to match
              your mood, preferences, and location.
            </p>
          </div>
          <FormButton
            id="hbtn"
            onClick={handleSubmit}
            label="Start Your Thought"
            className="bg-[#00501E] rounded-full py-4 border-gray-300 border-[0.5px]   font-semibold text-base p-3 text-white  w-[230px] flex justify-center items-center"
            startIcon={<Telescope size={25} color="#C8A0FF" />}
          />
        </div>
        {/* <div className="relative hidden md:block rounded-3xl overflow-hidden ">
          <img
            src="https://plus.unsplash.com/premium_photo-1700483344376-a36e2afca858?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full rounded-3xl h-[450px] object-cover"
          />
          <div className="absolute inset-0 bg-black/75 rounded-3xl"></div>
        </div> */}
      </section>
    </div>
  );
};

export default HomePage;
