import React from "react";
import FormButton from "../../components/base/FormButton";
import { Telescope } from "lucide-react";

interface heroSubmit {
  handleSubmit?: () => void;
}

const HomePage: React.FC<heroSubmit> = ({ handleSubmit }) => {

  return (
    <div>
      <section className="bg-cover  h-[75vh] md:h-[80vh] flex flex-col justify-center items-center text-center px-6 font-intra">
        <h1 className="text-5xl font-bold mb-4">
          Discover Experiences That Speak to Your Soul
        </h1>
        <p className="text-lg mb-6 text-[#616161]">
          From relaxation to adventure, find tailored activities to match your
          mood, preferences, and location.
        </p>
        <FormButton
          onClick={handleSubmit}
          label="Start Your Thought"
          className="bg-[#00501E] rounded-full p-3 text-white  w-[230px] flex justify-center items-center"
          startIcon={<Telescope size={25} />} 
        />
      </section>
    </div>
  );
};

export default HomePage;
