import React, { useEffect, useRef, useState } from "react";
import LocationImage from "../../../components/custom/LocationImage";
import { motion, AnimatePresence } from "framer-motion";

interface weather {
  average_temperature: string;
  averageTemperature: string;
  clothing_recommendations: string;
  clothing: string;
  clothingRecommendations: string;
  general: string;
  recommended_time_to_visit: string;
}

interface AiDatas {
  itinerary: { [key: string]: any };
  weather: weather;
}

interface userSelected {
  fromLocation: string;
  toLocation: string;
  duration: string;
  people: string;
  budget: string;
  planningWith: string;
}

interface RelaxationPlan {
  plan: {
    AiDatas: AiDatas;
    userSelected: userSelected;
  };
}

const Information: React.FC<RelaxationPlan> = ({ plan }) => {
  const [showWeather, setShowWeather] = useState(false);

  const toggleWeather = () => {
    setShowWeather(!showWeather);
  };

  // console.log(showWeather);

  const weatherData = plan?.AiDatas?.weather;

  // console.log(weatherData);

  const weatherRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        weatherRef.current &&
        !weatherRef.current.contains(event.target as Node)
      ) {
        setShowWeather(false);
      }
    };

    if (showWeather) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showWeather]);

  return (
    <div className="h-[78vh] relative ">
      <div className="flex justify-center items-center mt-7">
        <div className="flex justify-center items-center w-[86vw]">
          <LocationImage
            location={`${plan?.userSelected?.toLocation.split(",")[0]}`}
            className="rounded-3xl w-full h-[80vh] pointer-events-none"
          />
          <h1 className="absolute bottom-0 left-32 text-[3em] text-white/90 z-10">
            <span className="font-bold">
              {plan?.userSelected?.fromLocation.split(",")[0]}
            </span>{" "}
            to{" "}
            <span className="font-bold">
              {plan?.userSelected?.toLocation.split(",")[0]}
            </span>
          </h1>

          <div className="absolute top-0 w-[85vw]  m-2 h-[80vh] opacity-50 bg-gradient-to-t from-black to-white/40 rounded-3xl" />
        </div>
        {/* Weather Icon */}
        <div
          className="absolute top-4 right-10 md:right-28 z-20 cursor-pointer  bg-white/10 rounded-full flex justify-center items-center h-[30px] w-[30px] md:h-[60px] md:w-[60px]"
          onClick={toggleWeather}
        >
          <img src="/pngwingweather.png" alt="Weather" className="md:h-[50px] h-[30px]" />
        </div>

        {/* Weather Popup */}
        <AnimatePresence>
          {showWeather && weatherData && (
            <motion.div
              ref={weatherRef}
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-20  right-28 transform -translate-y-1/2 bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl p-6 z-10 w-[320px]"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                🌤️ Weather Details
              </h2>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Average Temp:</span>{" "}
                {weatherData.average_temperature ||
                  weatherData.averageTemperature ||
                  "15-35°C"}
              </p>
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Overview:</span>{" "}
                {weatherData.general}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Clothing Tips:</span>{" "}
                {weatherData.clothing_recommendations ||
                  weatherData.clothingRecommendations ||
                  weatherData.clothing}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">
                  Recommended time to visit:
                </span>{" "}
                {weatherData.recommended_time_to_visit}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Information;
