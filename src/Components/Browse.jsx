import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";
import UseMovieFetch from "../Hooks/UseMovieFetch";
import { addNowPlayingMovies } from "../Utils/movieSlice";

const Browse = () => {
  const dispatch = useDispatch();

  const nowPlayingMovie = UseMovieFetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
  );

  dispatch(addNowPlayingMovies(nowPlayingMovie.results));

  return (
    <div className="absolute">
      <Header />
      <>
        <MainContainer />
      </>
    </div>
  );
};

export default Browse;
