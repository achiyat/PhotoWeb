import "dotenv/config";

export const buildApiUrl = async (Word, perPage) => {
  const baseUrl = "https://pixabay.com/api/";
  const queryParams = {
    key: process.env.PIXABAY_API_KEY, // Replace with your API key
    q: Word, // Decode the formatted query
    image_type: "photo",
    lang: "en",
    per_page: perPage,
  };

  // Construct the query string
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join("&");

  const query = queryString.replace("%2B", "+");

  return `${baseUrl}?${query}`;
};
