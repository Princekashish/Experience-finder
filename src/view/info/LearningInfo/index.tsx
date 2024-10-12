import { Calendar, CalendarClock, NotebookText } from "lucide-react";
import React from "react";
interface info {
  LearingData: {
    userSelected: {
      hourperday: string;
      month: string;
      subject: string;
    };
  };
}
export const imgroot =
  "https://images.unsplash.com/photo-1708923878558-6ab2c906e099?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const LearningInfo: React.FC<info> = ({ LearingData }) => {
  return (
    <div className="">
      <div className=" flex ">
        <div className="flex flex-wrap  gap-2  p-2 ">
          <h1 className="rounded-full px-3 py-2 border flex justify-center items-center gap-2">
            <NotebookText />
            {LearingData?.userSelected?.subject} 
          </h1>
          <h1 className="rounded-full px-3 py-2 border flex justify-center items-center gap-2 ">
            <Calendar />
            {LearingData?.userSelected?.month} 
          </h1>
          <h1 className="rounded-full px-3 py-2 border  flex justify-center items-center gap-2">
            <CalendarClock />
            {LearingData?.userSelected?.hourperday} hour
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LearningInfo;
