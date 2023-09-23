const apiKey = "39525914-9152bde184a13a887fbc35f2b"; // Replace with your API key

export const buildApiUrl = async (Word, perPage) => {
  const baseUrl = "https://pixabay.com/api/";
  const queryParams = {
    key: apiKey,
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

  //   console.log(queryString);
  //   console.log(queryString1);
  //   console.log(`${baseUrl}?${query}`);
  return `${baseUrl}?${query}`;
};
