import React from "react";
interface info {
  relation: {
    userSelected: {
      place: string;
      budget: string;
      duration: string;
      people: string;
      planningWith: string;
    };
  };
}
export const imgroot =
  "https://images.unsplash.com/photo-1708923878558-6ab2c906e099?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Information: React.FC<info> = ({ relation }) => {
  return (
    <div className="" >
      <div  className="">
        <div className="flex  gap-5 flex-wrap p-5 ">
          <h1 className="rounded-full px-3 py-2 border">
            📍{relation?.userSelected?.place} Place
          </h1>
          <h1 className="rounded-full px-3 py-2 border">
            🗓️{relation?.userSelected?.duration} Duration
          </h1>
          <h1 className="rounded-full px-3 py-2 border">
            🧑‍🤝‍🧑 {relation?.userSelected?.people} People
          </h1>
          <h1 className="rounded-full px-3 py-2 border">
            💰 Rs. {relation?.userSelected?.budget}
          </h1>
          <h1 className="rounded-full px-3 py-2 border">
            🧑🏼 {relation?.userSelected?.planningWith}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Information;
