import axios from "axios";

export const getPhotoData = async () => {
  try {
    let endpoint =
      "https://pixabay.com/api/?key=39525914-9152bde184a13a887fbc35f2b&q=yellow+flowers&image_type=photo&pretty=true";
    let response = await axios.get(endpoint);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching photo data:", error);
    throw error; // Optionally, rethrow the error to handle it further up the call stack.
  }
};
