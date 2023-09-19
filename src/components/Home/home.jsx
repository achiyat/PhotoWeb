import React, { useEffect } from "react";
import { getPhotoData } from "../../services/services";

export const Home = (props) => {
  // handle
  const initDataFromServer = async () => {
    let aaaa = await getPhotoData();
    console.log(aaaa);
  };

  // useEffect
  useEffect(() => {
    initDataFromServer();
  }, []);

  return <h1>Home</h1>;
};
