import React, { useState, useEffect } from "react";
import { fetchLocationImage } from "../../../lib/utils/unsplash";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface RegularTransportOption {
  mode: string;
  route: string;
  estimatedCostPerPerson: number;
  estimated_cost_per_person: number;
  travelDuration: string;
  travel_duration: string;
  description: string;
  pros: string;
  cons: string;
}

interface InternalTransportOption {
  description: string;
  estimatedCostPerDay: number;
  estimated_cost_per_day: number;
  mode: string;
  tips: string;
}

interface Transport {
  train: RegularTransportOption[];
  flight: RegularTransportOption[];
  bus: RegularTransportOption[];
  car: RegularTransportOption[];
  internalTransport: InternalTransportOption;
  internal_transport: InternalTransportOption;
}

interface AiDatas {
  budget: number;
  hotels: any[];
  itinerary: { [key: string]: any };
  restaurants: any[];
  sightseeing: any[];
  transport: Transport;
  travelStyle: string;
  travelers: number;
  tripName: string;
}

interface RelaxationPlan {
  plan: {
    AiDatas: AiDatas;
  };
}

const Details: React.FC<RelaxationPlan> = ({ plan }) => {
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [transportImages, setTransportImages] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = {
          train: await fetchLocationImage("indian train railway"),
          flight: await fetchLocationImage("airplane airport"),
          bus: await fetchLocationImage("tourist bus travel"),
          car: await fetchLocationImage("road trip car india"),
          internalTransport: await fetchLocationImage("taxi india"),
          internal_transport: await fetchLocationImage("taxi india"),
        };
        setTransportImages(images);
      } catch (error) {
        console.error("Error loading transport images:", error);
      }
    };

    loadImages();
  }, []);

  const handleModeClick = (mode: string) => {
    setSelectedMode(selectedMode === mode ? "" : mode);
  };

  if (!plan?.AiDatas?.transport) {
    return (
      <div>
        <h1 className="ml-2 font-bold text-xl">Transport Options</h1>
        <p className="text-gray-600 p-4">No transport data available</p>
      </div>
    );
  }

  const getTransportOptions = (mode: string) => {
    switch (mode) {
      case "train":
        return plan.AiDatas.transport?.train || [];
      case "flight":
        return plan.AiDatas.transport?.flight || [];
      case "bus":
        return plan.AiDatas.transport?.bus || [];
      case "car":
        return plan.AiDatas.transport?.[mode] || [];
      case "internalTransport":
      case "internal_transport": {
        const internalData =
          plan.AiDatas.transport?.internalTransport ||
          plan.AiDatas.transport?.internal_transport;
        return Array.isArray(internalData)
          ? internalData
          : internalData
          ? [internalData]
          : [];
      }
      default:
        return [];
    }
  };

  const getDisplayName = (mode: string) => {
    if (mode === "internalTransport" || mode === "internal_transport") {
      return "Local Transport";
    }
    if (mode === "car") return "Car / Self-Drive";
    return mode.charAt(0).toUpperCase() + mode.slice(1); // Capitalize other modes
  };

  const renderTransportCard = (
    option: RegularTransportOption | InternalTransportOption,
    idx: number
  ) => {
    const isInternal =
      "estimatedCostPerDay" in option ||
      "estimated_cost_per_day" in option ||
      "estimatedCostPerPerson" in option ||
      "estimated_cost_per_person" in option;

    return (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay: idx * 0.1 }}
        className="p-6  rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 
          bg-zinc-900 backdrop-blur-sm bg-opacity-90 mb-4"
      >
        <h2 className="text-xl font-bold capitalize mb-4 text-gray-100">
          {option.mode}
        </h2>
        <div className=" border-gray-100 pb-4 ">
          {!isInternal && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Route:</span>
                <span className="text-gray-700 font-semibold">
                  {(option as RegularTransportOption).route}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Duration:</span>
                <span className="text-gray-700 font-semibold">
                  {(option as RegularTransportOption).travelDuration ||
                    (option as RegularTransportOption).travel_duration}
                </span>
              </div>
            </>
          )}
          <div className="flex items-center gap-2">
            <span className="text-gray-200">Price:</span>
            <span className="text-blue-600 font-semibold">
              ₹
              <span className="text-blue-600 font-semibold">
                {isInternal
                  ? (option as InternalTransportOption).estimatedCostPerDay ??
                    (option as InternalTransportOption)
                      .estimated_cost_per_day ??
                    (option as RegularTransportOption).estimatedCostPerPerson ??
                    (option as RegularTransportOption).estimated_cost_per_person
                  : (option as RegularTransportOption).estimatedCostPerPerson ??
                    (option as RegularTransportOption)
                      .estimated_cost_per_person}{" "}
                {isInternal ? "/person" : "/person"}
              </span>
            </span>
          </div>
        </div>
        <p className="text-gray-200 mb-4 leading-relaxed">
          {option.description}
        </p>

        {"estimatedCostPerDay" in option ||
        "estimated_cost_per_day" in option ? (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-700">
              <strong className="block mb-1">Tips</strong>
              {(option as InternalTransportOption).tips}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-green-100/10 p-4 rounded-3xl mb-2 ">
              <p className="text-green-700">
                <strong className="block mb-1">Pros</strong>
                {(option as RegularTransportOption).pros}
              </p>
            </div>
            <div className="bg-red-100/10  p-4 rounded-3xl">
              <p className="text-red-700">
                <strong className="block mb-1">Cons</strong>
                {(option as RegularTransportOption).cons}
              </p>
            </div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <div className="p-10 ">
      <h1 className="text-3xl font-bold mb-8 text-white text-start">
        Transport Options
      </h1>

      {/* Mode Switcher */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={25}
        slidesPerView={3.2}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="p-5"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
          {(Object.keys(plan.AiDatas.transport) as (keyof Transport)[]).map(
            (mode) => (
              <SwiperSlide key={mode}>
                <motion.div
                  key={mode}
                  onClick={() => handleModeClick(mode)}
                  className={`relative cursor-pointer rounded-xl group overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    scale: selectedMode === mode ? 1 : 1,
                    y: selectedMode && selectedMode !== mode ? 0 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={
                      transportImages[mode] ||
                      "https://via.placeholder.com/800x600?text=Loading..."
                    }
                    alt={`${getDisplayName(mode)} transport`}
                    className={`h-[250px] object-cover w-full rounded-xl transition-all duration-500 
                ${selectedMode === mode ? "brightness-100" : "brightness-75"}`}
                  />
                  <div
                    className={`absolute inset-0 rounded-xl flex items-center justify-center 
              transition-all duration-500 bg-gradient-to-t from-black/70 to-black/20
              ${selectedMode === mode ? "bg-opacity-60" : "bg-opacity-40"}`}
                  >
                    <h3 className="text-white text-2xl font-bold capitalize text-center px-4">
                      {getDisplayName(mode)}
                    </h3>
                  </div>
                </motion.div>
              </SwiperSlide>
            )
          )}
        </div>
      </Swiper>

      {/* Transport Cards */}
      <AnimatePresence mode="wait">
        {selectedMode && (
          <motion.div
            key={selectedMode}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-8"
          >
            {getTransportOptions(selectedMode).map((option, idx) =>
              renderTransportCard(option, idx)
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Details;
