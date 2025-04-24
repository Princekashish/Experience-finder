import axios from "axios";

export const fetchLocationImage = async (location: string): Promise<string> => {
  try {
    // Construct the URL with the fixed page number (always 1) and the actual client ID
    const url = `https://api.unsplash.com/search/photos?page=1&query=${location}&orientation=landscape&per_page=1&client_id=${import.meta.env.VITE_UNSPLACE_ACCESS_KEY}`;

    // Making the API request
    const response = await axios.get(url);

    // console.log(response); // Debugging the response for verification

    // If results are found, return the URL of the first image
    if (response.data.results.length > 0) {
      // console.log('Found image:', response.data.results[0].urls.regular);
      return response.data.results[0].urls.regular;
    }

    // Return a fallback image if no results are found
    return "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    // Return a default image in case of an error
    return "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }
};
