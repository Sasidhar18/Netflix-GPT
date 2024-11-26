import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";
import UseMovieFetch from "../Hooks/UseMovieFetch";
import { addNowPlayingMovies, addPopularMovies } from "../Utils/movieSlice";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  const dispatch = useDispatch();

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
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
