import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiKey } from "../Utils/constants";
import { API_OPTIONS } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovies } from "../Utils/gptSlice";

const GptSearchBar = () => {
  const gptInput = useRef(null);
  const dispatch = useDispatch();

  const fetchMovie = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const response = await data.json();

    return response.results;
  };

  const handleGptSearchClick = async () => {
    "";
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      gptInput.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya without dot at end";

    const result = await model.generateContent(gptQuery);

    if (!result.response) {
      return <h3>Something went wrong, try again after sometime.</h3>;
    }

    const movieResult = result?.response?.text()?.split(",");

    const promiseArray = movieResult.map((movie) => fetchMovie(movie));

    const tmdbResult = await Promise.all(promiseArray);

    dispatch(addGptMovies({ names: movieResult, result: tmdbResult }));
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={gptInput}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder="What would you like to watch?"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
