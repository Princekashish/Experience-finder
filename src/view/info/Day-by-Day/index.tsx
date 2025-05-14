import React, { useEffect, useState } from "react";
import { fetchLocationImage } from "../../../lib/utils/unsplash";

interface ItineraryDay {
    title: string;
    morning?: {
        time: string;
        activity: string;
        location: string;
        notes: string;
    };
    breakfast?: {
        time: string;
        activity: string;
        location: string;
        notes: string;
    };
    afternoon?: {
        time: string;
        activity: string;
        location: string;
        notes: string;
    };
    lunch?: {
        time: string;
        activity: string;
        location: string;
        notes: string;
    };
    evening?: {
        time: string;
        activity: string;
        location: string;
        notes: string;
    };
    dinner?: {
        time: string;
        activity: string;
        location: string;
        notes: string;
    };
    [key: string]: any;
}

interface DayItineraiesProps {
    itinerary: { [day: string]: ItineraryDay };
}

export const DayItineraies: React.FC<DayItineraiesProps> = ({ itinerary }) => {
    const [images, setImages] = useState<{ [day: string]: string }>({});
    const [loadingImages, setLoadingImages] = useState<{ [day: string]: boolean }>({});

    useEffect(() => {
        if (!itinerary) return;
        const fetchImages = async () => {
            const newImages: { [day: string]: string } = {};
            const newLoading: { [day: string]: boolean } = {};
            await Promise.all(
                Object.entries(itinerary).map(async ([day, details]) => {
                    newLoading[day] = true;
                    const query = details.title || day;
                    const imageUrl = await fetchLocationImage(query);
                    newImages[day] = imageUrl;
                    newLoading[day] = false;
                })
            );
            setImages(newImages);
            setLoadingImages(newLoading);
        };
        fetchImages();
        // eslint-disable-next-line
    }, [itinerary]);

    const timeOrder = ['morning', 'breakfast', 'afternoon', 'lunch', 'evening', 'dinner', 'night'];

    if (!itinerary) {
        return <div className="p-6 text-center text-gray-500">No itinerary available.</div>;
    }

    return (
        <div className=" p-10">
            <h2 className="text-3xl font-extrabold mb-10 text-center text-yellow-500 tracking-tight drop-shadow-lg">
                Day-by-Day Itinerary
            </h2>
            <div className="space-y-10">
                {Object.entries(itinerary).sort().map(([day, details]) => (
                    <div
                        key={day}
                        className="bg-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row hover:scale-[1.02] transition-transform duration-300"
                    >
                        {/* Image Section */}
                        <div className="md:w-1/3 w-full h-56 md:h-auto relative flex-shrink-0">
                            {loadingImages[day] ? (
                                <div className="w-full h-full bg-gray-200 animate-pulse" />
                            ) : (
                                <img
                                    src={images[day]}
                                    alt={details.title}
                                    className="object-cover w-full h-full min-h-[220px] md:rounded-l-3xl md:rounded-r-none rounded-t-3xl md:rounded-t-none"
                                    loading="lazy"
                                />
                            )}
                            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow">
                                {day.replace("_", " ").replace(/\bday/i, "Day ")}
                            </div>
                        </div>
                        {/* Details Section */}
                        
                        <div className="flex-1 p-6 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-3 text-yellow-400 drop-shadow">
                                {details.title || day.replace("_", " ")}
                            </h3>
                            <div className="space-y-4">
                                {timeOrder.map((section) => {
                                    if (details[section]) {
                                        return (
                                            <div key={section} className="pl-4 border-l-4 border-yellow-400 mb-2">
                                                <div className="font-semibold capitalize text-lg text-white/90">
                                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                                </div>
                                                <div className="text-sm text-gray-200">
                                                    <span className="font-bold">Time:</span> {details[section].time}<br />
                                                    <span className="font-bold">Activity:</span> {details[section].activity}<br />
                                                    <span className="font-bold">Location:</span> {details[section].location}<br />
                                                    <span className="font-bold">Notes:</span> {details[section].notes}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};