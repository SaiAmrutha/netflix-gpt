import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, onCardClick }) => {
  return (
    <div className="px-5">
      <h1 className="bold text-lg md:text-3xl py-5 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              posterPath={movie.poster_path}
              onClick={() => onCardClick?.(movie)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
