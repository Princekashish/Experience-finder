import React from "react";

// Interface for each topic
interface Topic {
  assessmentMethods: string[];
  difficultyLevel: string;
  onlineTestURLs: string[];
  recommendedResources: {
    name?: string;
    type?: string;
    url?: string;
    platform?: string;
    title?: string;
  }[];
  subTopics: string[];
  weeklyGoals: string[];
  studyHoursPerWeek: number;
}

// Interface for the overall data structure
interface LearningPlan {
  AiDatas?: {
    topics?: Topic[]; // Array of topics
  };
}

interface LearningTopicProps {
  plan: LearningPlan;
}

const LearningTopic: React.FC<LearningTopicProps> = ({ plan }) => {
  const topics = plan?.AiDatas?.topics || [];

  return (
    <div className="grid  mt-6 grid-cols-1 xl:grid-cols-2 gap-5 p-2 xl:p-5  ">
      {topics.map((topic, index) => (
        <div
          key={index}
          className="bg-zinc-900 pt-5  border border-zinc-500 flex flex-col justify-center items-center gap-5 rounded-2xl shadow-md"
        >
          <h1 className="text-xl font-bold text-center bg-gray-400 text-black rounded-xl py-2 px-5">
            Topic {index + 1}
          </h1>

          <div className="flex justify-center items-center text-sm gap-5">
            <h2 className="">
              Difficulty Level:{" "}
              <span className={`text-sm ${topic.difficultyLevel === 'Easy' ? 'text-green-600' : topic.difficultyLevel === 'Medium' ? 'text-yellow-500' : 'text-red-600'}`}>
                {topic.difficultyLevel}
              </span>
            </h2>
            <h2>Study Hours: {topic.studyHoursPerWeek}</h2>
          </div>

          <h2 className="text-lg font-semibold">Weekly Goals:</h2>
          <ul className="flex flex-col fle pl-7 list-disc">
            {topic.weeklyGoals.map((goal, i) => (
              <li key={i}>{goal}</li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold">Sub Topics:</h2>
          <ol className="flex flex-col justify-start  items-start pl-6 list-decimal">
            {topic.subTopics.map((subTopic, i) => (
              <li key={i}>{subTopic}</li>
            ))}
          </ol>

          <h2 className="text-lg font-semibold">Online Test URLs:</h2>
         <div className="">
         <ul className=" flex flex-col justify-center items-center xl:flex-row gap-5  ">
            {topic.onlineTestURLs.length > 0 ? (
              topic.onlineTestURLs.map((url, i) => (
                <li key={i} className="">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 "
                  >
                   Test
                  </a>
                </li>
              ))
            ) : (
              <li className="text-green-700">Coming Soon</li>
            )}
          </ul>
         </div>

          {/* <h2 className="text-lg font-semibold">Assessment Methods:</h2>
          <ul>
            {topic.assessmentMethods.map((method, i) => (
              <li key={i}>{method}</li>
            ))}
          </ul> */}

          <h2 className="text-lg font-semibold">Recommended Resources:</h2>
          
          <div className="flex justify-center items-center  xl:w-3/4">
          <ul className="flex flex-col  w-full  text-base mb-5 list-disc">
              {topic.recommendedResources.map((resource, i) => (
                <li key={i}>
                  {resource.name && <span>{resource.name} </span>}
                  {resource.platform && <span>{resource.platform} </span>}
                  {resource.url && (
                    <a
                      className="text-blue-600"
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.type}
                    </a>
                  )}
                 
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningTopic;
