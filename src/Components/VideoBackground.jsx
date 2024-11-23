import React from "react";
import UseMovieFetch from "../Hooks/UseMovieFetch";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../Utils/movieSlice";

const VideoBackground = ({ movieID }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((state) => state.movie.trailerVideo);
  const movieData = UseMovieFetch(
    "https://api.themoviedb.org/3/movie/" + movieID + "/videos?language=en-US"
  );
  const filterData = movieData?.results?.filter(
    (video) => video.type === "Trailer"
  );
  const trailer = filterData?.length ? filterData?.[0] : movieData?.results?.[0];

  dispatch(addTrailerVideo(trailer));

  console.log(trailerVideo);

  return (
    <div className=" w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
