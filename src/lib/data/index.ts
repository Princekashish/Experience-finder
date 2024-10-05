const planningWithOptions = [
  { value: "friends", label: "👫 " },
  { value: "family", label: "👨‍👩‍👧‍👦 " },
  { value: "A couple", label: "💑" },
  { value: "Just Me", label: "🙋‍♂️ " },
];
export default planningWithOptions;

export const AI_Prompt_Relaxation =
  "Generate an Adventure Plan for Location: {location}, for {duration} days with a Rs. {price} budget for a {goingWith}. The plan should include exciting activities such as trekking, mountain exploration, camping, rafting, and more. For each activity, provide details such as geo coordinates, price, activity image URL, rating, and a short description. Suggest an itinerary with information like placeName, place details, geo coordinates, ticket pricing, ratings, and travel time between locations. Include a day-by-day breakdown, highlighting adventure activities, scenic relaxation spots, and the best time to experience each. Format everything in JSON";

export const AI_Prompt_Learning =
  "Generate a detailed Learning Plan for studying {Subject} over {months} , with a daily study duration of {hours} hours.Break down the learning path into key sub-topics. Start with foundational concepts, then progress to intermediate and advanced topics. For each sub-topic, include the following details in JSON format: topic name, sub-topics, study hours per week, difficulty level (easy, medium, hard), recommended resources (books, websites, videos), assessment methods (quizzes, assignments, projects), URLs for online tests or practice exams, and weekly goals. Include milestones and progress tracking for the subject.";
