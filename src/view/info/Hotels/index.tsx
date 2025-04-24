import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchLocationImage } from "../../../lib/utils/unsplash"; // your image fetcher
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface Hotel {
  name: string;
  description: string;
  amenities: string[];
  imageUrl: string;
  pricePerNight: number;
  price_per_night: number;
  rating: number;
  geoCoordinates: string;
  geo_coordinates: string;
}

interface AiDatas {
  budget: number;
  hotels: Hotel[];
  itinerary: { [key: string]: any };
  restaurants: any[];
  sightseeing: any[];
  transport: any;
  travelStyle: string;
  travelers: number;
  tripName: string;
}

interface RelaxationPlan {
  plan: {
    AiDatas: AiDatas;
  };
}

const Hotels: React.FC<RelaxationPlan> = ({ plan }) => {
  const [selectedHotel, setSelectedHotel] = useState<string>("");
  const [hotelImages, setHotelImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchHotelImages = async () => {
      try {
        // Create a mapping of hotel names to their corresponding image URLs
        const images = await Promise.all(
          plan.AiDatas.hotels.map(async (hotel) => {
            const modifiedName = `${hotel.name}`; // Adding "Hotels" to the name
            const imageUrl = await fetchLocationImage(modifiedName); // Fetch image based on modified name
            return { name: hotel.name, imageUrl };
          })
        );

        // Store the fetched images in state
        const imagesMap = images.reduce((acc, { name, imageUrl }) => {
          acc[name] = imageUrl;
          return acc;
        }, {} as { [key: string]: string });

        setHotelImages(imagesMap);
      } catch (error) {
        console.error("Error fetching hotel images:", error);
      }
    };

    if (plan?.AiDatas?.hotels?.length > 0) {
      fetchHotelImages();
    }
  }, [plan]);

  if (!plan?.AiDatas?.hotels || plan.AiDatas.hotels.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Places to stay
        </h1>
        <p className="text-gray-600">No hotel data available</p>
      </div>
    );
  }

  const renderHotelCard = (hotel: Hotel, index: number) => {
    const isSelected = selectedHotel === hotel.name;
    const imageUrl =
      hotelImages[hotel.name] ||
      "https://via.placeholder.com/800x600?text=Hotel+Image";

    return (
      <motion.div
        key={index}
        onClick={() => setSelectedHotel(isSelected ? "" : hotel.name)}
        className="cursor-pointer "
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}

      >
        <div className="relative rounded-3xl  p-2 ">
          <img
            src={imageUrl}
            alt={hotel.name}
            className="w-full h-64 object-cover rounded-3xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/800x600?text=Hotel+Image";
            }}
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 font-semibold">{hotel.rating}</span>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {hotel.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {hotel.description.length > 10
                ? `${hotel.description.substring(0, 77)}...`
                : `${hotel.description}`}
            </p>

            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-4 ">
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="text-gray-600">
                        <span className="font-semibold text-xl text-blue-600">
                          ₹{hotel.pricePerNight || hotel.price_per_night}
                        </span>
                        <span className="text-sm ml-1">per night</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${hotel.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600"
                        >
                          view map
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-10 ">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Places to stay
      </h1>
      <Swiper
        modules={[Navigation]}
        spaceBetween={25}
        slidesPerView={3}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className=""
      >
        {plan.AiDatas.hotels.map((hotel, index) => (
          <SwiperSlide key={hotel.name}>
            {renderHotelCard(hotel, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hotels;
