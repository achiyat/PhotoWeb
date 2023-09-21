import React, { useEffect } from "react";
import { getPhotoFromAPI } from "../../services/services";

export const Home = (props) => {
  const buildApiUrl = async (Word, perPage) => {
    const apiKey = "39525914-9152bde184a13a887fbc35f2b";
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

    const query = queryString.replace("%20", "+");

    console.log(query);
    //   console.log(queryString1);
    //   console.log(`${baseUrl}?${query}`);
    return `${baseUrl}?${query}`;
  };

  // handle
  const initDataFromServer = async () => {
    try {
      let endpoint = await buildApiUrl("yellow flowers", 10);
      console.log(endpoint);
      const response = await getPhotoFromAPI(endpoint);
      // Object.values(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  // useEffect
  useEffect(() => {
    initDataFromServer();
  }, []);

  return <h1>Home</h1>;
};
