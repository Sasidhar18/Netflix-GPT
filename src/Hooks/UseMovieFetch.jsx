import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../Utils/constants";

const UseMovieFetch = (api) => {
  const [apiData, setApiData] = useState([]);
  const getAPIData = async () => {
    const data = await fetch(api, API_OPTIONS);
    const json = await data.json();
    setApiData(json);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return apiData;
};

export default UseMovieFetch;
