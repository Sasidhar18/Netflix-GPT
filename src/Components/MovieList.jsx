import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="movie-section">
      <h1>{title}</h1>
      <div className="movie-row">
        <div className="movie-row-inner">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
