import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchLocationImage } from "../../../lib/utils/unsplash";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Sightseeing {
  name: string;
  description: string;
  activities: string[];
  estimatedTravelTimeFromHotel: string;
  ticketPricing: string;
  ticket_pricing: string;
  userRating: number;
  user_rating: number;
}

interface AiDatas {
  sightseeing: Sightseeing[];
}

interface RelaxationPlan {
  plan: {
    AiDatas: AiDatas;
  };
}

const Sightseeing: React.FC<RelaxationPlan> = ({ plan }) => {
  const [sightImages, setSightImages] = useState<{ [key: string]: string }>({});
  const [selectedSight, setSelectedSight] = useState<string | null>(null);

  useEffect(() => {
    const fetchSightImages = async () => {
      try {
        const images = await Promise.all(
          plan.AiDatas.sightseeing.map(async (sight) => {
            const imageUrl = await fetchLocationImage(sight.name);
            return { name: sight.name, imageUrl };
          })
        );

        const imagesMap = images.reduce((acc, { name, imageUrl }) => {
          acc[name] = imageUrl;
          return acc;
        }, {} as { [key: string]: string });

        setSightImages(imagesMap);
      } catch (error) {
        console.error("Error fetching sightseeing images:", error);
      }
    };

    if (plan?.AiDatas?.sightseeing?.length > 0) {
      fetchSightImages();
    }
  }, [plan]);

  if (!plan?.AiDatas?.sightseeing || plan.AiDatas.sightseeing.length === 0) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Sightseeing</h1>
        <p className="text-gray-600">No sightseeing data available</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Things to do
      </h1>

      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
        className=""
      >
        {plan.AiDatas.sightseeing.map((sight, index) => {
          const imageUrl =
            sightImages[sight.name] ||
            "https://via.placeholder.com/800x600?text=Sightseeing";

          return (
            <SwiperSlide key={sight.name}>
              <motion.div
                className="relative group overflow-hidden rounded-3xl shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedSight(sight.name)}
              >
                <img
                  src={imageUrl}
                  alt={sight.name}
                  className="h-[340px] w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h2 className="text-white text-2xl font-bold drop-shadow-md text-center">
                    {sight.name}
                  </h2>
                </div>
              </motion.div>
              <div className="p-2 pl-3">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">{sight.name}</h1>
                  <span className="text-yellow-600 font-medium">★ {sight.userRating || sight.user_rating}</span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <AnimatePresence>
        {selectedSight && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSight(null)}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-8 relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {plan.AiDatas.sightseeing
                .filter((s) => s.name === selectedSight)
                .map((sight) => (
                  <div key={sight.name}>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">
                      {sight.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{sight.description}</p>
                    <ul className="list-disc list-inside text-gray-500 mb-4">
                      {sight.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <div>
                        <p>
                          Travel Time: {" "}
                          <span className="font-semibold">
                            {sight.estimatedTravelTimeFromHotel
                              ? `${sight.estimatedTravelTimeFromHotel} minutes`
                              : "30-50 minutes"}
                          </span>
                        </p>
                      </div>
                      <div>
                        <strong>Ticket:</strong> {sight.ticketPricing || sight.ticket_pricing}
                      </div>
                    </div>
                    <div className="text-yellow-600 font-semibold mb-4">
                      ★ {sight.userRating || sight.user_rating}
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${sight.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm"
                    >
                      View on Map
                    </a>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sightseeing;