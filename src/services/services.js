import axios from "axios";

export const getPhotoFromAPI = async (endpoint, word, perPage) => {
  try {
    let response = await axios.get(endpoint, {
      params: { search: word, perPage: perPage },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching photo data:", error);
    throw error; // Optionally, rethrow the error to handle it further up the call stack.
  }
};
