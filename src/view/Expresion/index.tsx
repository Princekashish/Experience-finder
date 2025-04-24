import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/base/FormButton";
import AuthStatus from "../../components/custom/AuthStatus";
import top_tripe from "../../../Top_April- July.json";
import { fetchLocationImage } from "../../lib/utils/unsplash";
import Hiddentrip from "../../../Hidden_gem.json";
import NorthSouthTrip from "../../../NorthSouth.json";
import testimonials from "../../../testimonials.json";
import { User } from "firebase/auth";
import { auth } from "../../lib/config/Firebase";
interface Destination {
  name: string;
  country: string;
  imageUrl?: string;
}

interface IndiaDestination {
  name: string;
  state: string;
  imageURI?: string;
}

interface NorthSouthTrip {
  name: string;
  side: string;
  imageURI?: string;
}

const Expresion: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [randomDestinations, setRandomDestinations] = useState<Destination[]>(
    []
  );
  const [indiaDestinations, setIndiaDestinations] = useState<
    IndiaDestination[]
  >([]);
  const [northsouthtrip, setNorthSouthTrip] = useState<NorthSouthTrip[]>([]);

  useEffect(() => {
    const getRandomDestinations = async () => {
      const destinations = top_tripe.top_destinations
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(({ name, country }) => ({ name, country }));

      const destinationsWithImages = await Promise.all(
        destinations.map(async (destination) => {
          const imageUrl = await fetchLocationImage(destination.name);
          return { ...destination, imageUrl };
        })
      );

      setRandomDestinations(destinationsWithImages);
    };

    const hiddenTrip = async () => {
      const destinations = Hiddentrip.sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(({ name, state }) => ({ name, state }));

      const destinationsWithImages = await Promise.all(
        destinations.map(async (destination) => {
          const imageURI = await fetchLocationImage(destination.name);
          return { ...destination, imageURI };
        })
      );
      setIndiaDestinations(destinationsWithImages);
    };

    const SouthTrip = async () => {
      const destinations = NorthSouthTrip.destinations
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
        .map(({ name, side }) => ({ name, side }));

      const destinationsWithImages = await Promise.all(
        destinations.map(async (destination) => {
          const imageURI = await fetchLocationImage(destination.name);
          return { ...destination, imageURI };
        })
      );
      setNorthSouthTrip(destinationsWithImages);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    getRandomDestinations();
    hiddenTrip();
    SouthTrip();

    return () => unsubscribe();
  }, []);

  const navigatemood = (mood: string) => {
    navigate(`/dashboard/${mood}`);
  };

  const handleAuthChange = (
    isAuthenticated: boolean,
    userEmail?: string | null,
    photoURL?: string | null,
    displayName?: string | null
  ) => {
    setUser(
      isAuthenticated
        ? ({ email: userEmail, photoURL, displayName } as User)
        : null
    );
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center p-5 font-intra gap-5">
        <div className="flex justify-center items-center flex-col text-center h-[70vh]">
          <h1 className="text-[4em] font-bold tracking-tighter">
            Hey,{" "}
            <span className="text-yellow-500">
              {user?.displayName || "Guest"}{" "}
            </span>
            <br /> your personal trip planner
          </h1>
          <p className="tracking-tighte">
            Let AI help you find experiences that truly match your vibe—whether{" "}
            <br />
            you're in the mood to chill, explore, or try something totally new.
          </p>

          <FormButton
            label="Get Start"
            onClick={() => navigatemood("relaxation")}
            className="bg-[#f2f2f2] text-black font-semibold px-32 py-4 mt-5 rounded-3xl"
          />
        </div>
        <div className="relative bg-[url('https://images.unsplash.com/photo-1625710337446-e7bb1865c9f7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] w-[85vw] rounded-3xl bg-cover bg-center bg-no-repeat h-[70vh] object-contain">
          <div className="p-5">
            <h1 className="font-bold text-[2.5em] absolute bottom-14">
              Best Travel Destination in {new Date().getFullYear()}
            </h1>
            <FormButton
              label="Check out"
              className="absolute left-10 bottom-2 px-5 py-3 bg-gray-50 text-black rounded-3xl"
            />
          </div>
        </div>
        <div className="text-start w-[85vw] p-5 mt-10">
          <h1 className="text-[2em]">
            Top Places to Visit in{" "}
            {new Date().toLocaleString("default", { month: "long" })}-{" "}
            {new Date(
              new Date().setMonth(new Date().getMonth() + 3)
            ).toLocaleString("default", { month: "long" })}{" "}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {randomDestinations.map((destination, index) => (
              <div
                key={index}
                className="relative rounded-3xl overflow-hidden h-64"
              >
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-white text-xl font-semibold">
                    {destination.name}
                  </h2>
                  <p className="text-white/80">{destination.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-start w-[85vw] p-5 mt-10">
          <h1 className="text-[2em]">Top Places to Visit in INDIA</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {indiaDestinations.map((destination, index) => (
              <div
                key={index}
                className="relative rounded-3xl overflow-hidden h-64"
              >
                <img
                  src={destination.imageURI}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-white text-xl font-semibold">
                    {destination.name}
                  </h2>
                  <p className="text-white/80">{destination.state}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-10 mt-10 ">
          <div className="">
            <img
              src="https://plus.unsplash.com/premium_photo-1732899535674-b269decc396f?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="rounded-full h-[340px] w-[340px] object-cover"
            />
          </div>
          <div className="w-1/2 space-y-4 flex justify-start flex-col items-start">
            <h1 className="capitalize text-[2em] font-semibold">
              Your ultimate travel sidekick
            </h1>
            <p className="tracking-tighter">
              Looking for the perfect trip planner for your next family
              vacation, romantic getaway, anniversary escape, or birthday trip?
              You're in the right place. Ask me anything about planning your
              vacation — from dreamy destinations and cozy stays to flights,
              road trips, and more. Whether you're traveling with kids, your
              partner, or solo, I'll help you build the perfect itinerary. No
              more juggling tabs and apps — I'm the only AI travel planner you
              need. Get inspired with personalized destination ideas and
              stunning video content from creators you'll love. Then, customize
              every detail to make the most of your precious vacation days.
            </p>
            <FormButton
              label="Get Start"
              onClick={() => navigatemood("relaxation")}
              className="bg-[#f2f2f2] text-black font-semibold px-32 py-4 mt-5 rounded-3xl"
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-[85vw] mt-10 gap-10">
          <div className=" w-[400px] h-[240px] flex flex-col  justify-center items-start rounded-3xl">
            <p className="text-[2em] text-center">
              No more wasting endless hours searching for the perfect trip.
            </p>
            <div className="m-10 flex flex-col justify-start items-start gap-2">
              <img src="/Social Proof.png" alt="" className="h-[20px]" />
              <p className="text-sm tracking-tighter">
                Trusted by 10+ travellers
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1639829423745-b8b68f8ea5b4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="h-[430px] rounded-3xl"
            />
          </div>
        </div>

        <div className="text-start w-[85vw] p-5 mt-10">
          <h1 className="text-[2em]">
            Top Places to Visit in North and South side
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
            {northsouthtrip.map((destination, index) => (
              <div
                key={index}
                className="relative rounded-3xl overflow-hidden h-80"
              >
                <img
                  src={destination.imageURI}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-white text-xl font-semibold">
                    {destination.name}
                  </h2>
                  <p className="text-white/80">{destination.side}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-[85vw] p-5 mt-10 flex flex-col gap-5">
          <h1 className="text-start text-3xl">
            Cute things people have said about Finder
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {testimonials.testimonials
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((items, i) => {
                return (
                  <div
                    key={i}
                    className=" p-5 rounded-3xl bg-white/10 gap-3  flex justify-between items-start flex-col h-64"
                  >
                    <h1 className="text-center font-extralight ">
                      {items.testimonial}
                    </h1>
                    <div className="flex justify-center items-center w-full gap-5 bg-white/10 rounded-2xl py-2">
                      <p className="text-center text-yellow-600">
                        {items.name}
                      </p>
                      <h2 className="text-center">{items.location}</h2>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <AuthStatus onAuthChange={handleAuthChange} />
    </>
  );
};

export default Expresion;
