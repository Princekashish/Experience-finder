import React from "react";

interface LearingPlan {
  topicSequence: {
    AiDatas?: {
      topicSequence?: [];
    };
  };
}

const LearningDetail: React.FC<LearingPlan> = ({ topicSequence }) => {
  const topics = topicSequence?.AiDatas?.topicSequence || [];
  return (
    <div>
      <h2 className="text-lg font-bold">TopicSequence: </h2>
      <div className="flex flex-wrap gap-5 p-5">
        {topics.map((topic, i) => (
          <div key={i} className="">
            <h1 className="bg-gray-200 shadow-md rounded-xl  p-2 font-semibold ">
              {topic}
            </h1>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default LearningDetail;
