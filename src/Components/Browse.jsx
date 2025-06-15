import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";
import UseMovieFetch from "../Hooks/UseMovieFetch";
import { addNowPlayingMovies, addPopularMovies } from "../Utils/movieSlice";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";

const Browse = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((state) => state.gpt.gptShow);

  const nowPlayingMovie = UseMovieFetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
  );

  const popularMovies = UseMovieFetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  );

  dispatch(addPopularMovies(popularMovies.results));

  dispatch(addNowPlayingMovies(nowPlayingMovie.results));

  return (
    <div className="">
      <Header />

      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
