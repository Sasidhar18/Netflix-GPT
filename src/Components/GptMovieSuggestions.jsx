import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { gptMoviesResult, gptMoviesName } = useSelector((state) => state.gpt);
  console.log(gptMoviesName, gptMoviesResult)
  if (gptMoviesName.length === 0) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {gptMoviesName.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={gptMoviesResult[index]}
          />
        ))}
      </div>
    </div>
  );
};
export default GptMovieSuggestions;
