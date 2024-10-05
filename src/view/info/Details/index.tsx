import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Activity {
  time: string;
  rating: number;
  placeName: string;
  description: string;
  image_url: string;
  ticketPricing: string;
  geoCoordinates: string;
  placeDetails: string;
}

interface DayPlan {
  activities: Activity[];
  day: string;
}

interface relaxationPlan {
  plan: {
    AiDatas?: {
      itinerary?: DayPlan[];
    };
  };
}

const Details: React.FC<relaxationPlan> = ({ plan }) => {
  return (
    <div>
      <h1 className="ml-2  font-bold text-xl">Days Plans :</h1>
      <div className=" p-2 md:grid   md:gap-3">
        {plan?.AiDatas?.itinerary?.map((dayPlan: DayPlan, index: number) => (
          <div key={index} className="mt-5 ">
            <h2 className="font-bold text-lg leading-none">{dayPlan.day}</h2>
            <div className="grid md:grid-cols-2 md:gap-5 md:p-3">
              {dayPlan.activities.map(
                (activity: Activity, activityIndex: number) => (
                  <div
                    key={activityIndex}
                    className="p-2 shadow-md rounded-md mt-10 border  "
                  >
                    <div className="flex flex-col gap-3 p-2">
                      <Link
                        to={
                          "https://www.google.com/maps/search/?api=1&query=" +
                          activity?.placeName
                        }
                         target="_black"
                      >
                        <p className="font-bold text-lg flex justify-start gap-2 items-center hover:scale-110 w-1/2  transform duration-300 ease-in-out ">
                          📍 {activity.placeName}{" "}
                          <span>
                            <FaLocationArrow size={14} />
                          </span>
                        </p>
                      </Link>
                      <p>{activity.description}</p>
                      <p className="text-sm">💰 {activity.ticketPricing}</p>
                      <p>Rating: ⭐ {activity.rating}</p>
                      <p>🕒 {activity.time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
