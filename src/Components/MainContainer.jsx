import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import UseMovieFetch from "../Hooks/UseMovieFetch";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movieNumber = Math.trunc(Math.random() * 20);

  const nowPlayingMovie = useSelector(
    (state) => state.movie.nowPlayingMovies
  )?.[movieNumber];
  console.log(nowPlayingMovie);

  if (!nowPlayingMovie) return;

  const { original_title, overview, id } = nowPlayingMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieID={id} />
    </div>
  );
};

export default MainContainer;
