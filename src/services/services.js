import axios from "axios";

export const getPhotoFromAPI = async (endpoint) => {
  try {
    let response = await axios.get(endpoint);
    return response.data.hits;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching photo data:", error);
    throw error; // Optionally, rethrow the error to handle it further up the call stack.
  }
};
