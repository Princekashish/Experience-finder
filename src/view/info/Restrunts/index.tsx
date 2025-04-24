import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchLocationImage } from "../../../lib/utils/unsplash"; // your image fetcher
import { MapPin } from "lucide-react";

interface Restaurant {
  name: string;
  description: string;
  cuisine: string;
  imageUrl: string;
  averageCost: string;
  average_cost: string;
  rating: number;
  geoCoordinates: string;
  geo_coordinates: string;
}

interface AiDatas {
  budget: number;
  hotels: any[];
  itinerary: { [key: string]: any };
  restaurants: Restaurant[];
  sightseeing: any[];
  transport: any;
  travelStyle: string;
  travelers: number;
  tripName: string;
}

interface userSelected {
  fromLocation: string;
  toLocation: string;
}

interface RelaxationPlan {
  plan: {
    AiDatas: AiDatas;
    userSelected: userSelected;
  };
}

const Restaurants: React.FC<RelaxationPlan> = ({ plan }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");
  const [restaurantImages, setRestaurantImages] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const fetchRestaurantImages = async () => {
      try {
        // Create a mapping of restaurant names to their corresponding image URLs
        const images = await Promise.all(
          plan.AiDatas.restaurants.map(async (restaurant) => {
            const modifiedName = `${restaurant.name}  Restaurant `; // Adding "Restaurants" to the name
            const imageUrl = await fetchLocationImage(modifiedName); // Fetch image based on modified name
            return { name: restaurant.name, imageUrl };
          })
        );

        // Store the fetched images in a state variable
        const imagesMap = images.reduce((acc, { name, imageUrl }) => {
          acc[name] = imageUrl;
          return acc;
        }, {} as { [key: string]: string });

        setRestaurantImages(imagesMap);
      } catch (error) {
        console.error("Error fetching restaurant images:", error);
      }
    };

    if (plan?.AiDatas?.restaurants?.length > 0) {
      fetchRestaurantImages();
    }
  }, [plan]);

  if (!plan?.AiDatas?.restaurants || plan.AiDatas.restaurants.length === 0) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Restaurants</h1>
        <p className="text-gray-600">No restaurant data available</p>
      </div>
    );
  }

  const renderRestaurantCard = (restaurant: Restaurant) => {
    const isSelected = selectedRestaurant === restaurant.name;
    const imageUrl =
      restaurantImages[restaurant.name] ||
      "https://via.placeholder.com/800x600?text=Restaurant+Image"; // Fallback image

    return (
      <motion.div
        key={restaurant.name}
        onClick={() => setSelectedRestaurant(isSelected ? "" : restaurant.name)}
        className="cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-lg bg-white">
          <img
            src={imageUrl}
            alt={restaurant.name}
            className="w-full h-64 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/800x600?text=Restaurant+Image"; // Fallback for broken images
            }}
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 font-semibold">{restaurant.rating}</span>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {restaurant.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {
                restaurant.description.substring(0, 47) +
                  "..." /* Shorten description */
              }
            </p>

            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="text-gray-600">
                        <span className="font-semibold text-xl text-blue-600">
                          ₹{restaurant.averageCost || restaurant.average_cost}
                        </span>
                        <span className="text-sm ml-1">average cost</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${restaurant.name}+${plan.userSelected.toLocation}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 flex justify-center items-center"
                        >
                          <MapPin /> view map
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
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Food & drink
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plan.AiDatas.restaurants.map((restaurant) =>
          renderRestaurantCard(restaurant)
        )}
      </div>
    </div>
  );
};

export default Restaurants;
