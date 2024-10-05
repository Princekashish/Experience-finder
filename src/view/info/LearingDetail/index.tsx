import React from "react";

interface TopicProps {
    topicSequence: string[];  // Array of topics inside AiDatas
}

const LearningDetail: React.FC<TopicProps> = ({ topicSequence }) => {
  return (
    <div>
      {topicSequence.map((item, i) => (
        <div key={i}>
          <h1 className="">{item}</h1> 
        </div>
      ))}
    </div>
  );
};

export default LearningDetail;
