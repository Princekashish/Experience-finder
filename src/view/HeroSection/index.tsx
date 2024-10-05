import React from "react";
import FormButton from "../../components/base/FormButton";
import { CiPlay1 } from "react-icons/ci";

interface heroSubmit {
  handleSubmit?: () => void;
}

const HomePage: React.FC<heroSubmit> = ({ handleSubmit }) => {

  return (
    <div>
      <section className="bg-cover h-[90vh] flex flex-col justify-center items-center text-center px-6 font-intra">
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
          className="bg-green-600 rounded-full p-3 text-white flex items-center"
          startIcon={<CiPlay1 size={25} />} 
        />
      </section>
    </div>
  );
};

export default HomePage;
