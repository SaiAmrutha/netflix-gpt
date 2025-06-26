import { useState } from "react";
import { TMDB_IMG } from "../utils/constants";
const MovieCard = ({ movie, onClick }) => {
  const [hovered, setHovered] = useState(false);
  if (!movie?.poster_path) return null;

  return (
    <div
      className="relative w-36 md:w-48 pr-4 cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={() => onClick?.(movie)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* console.log("Card clicked",movie.title); */}
      <img
        className="rounded-md w-full h-full object-cover"
        alt="movie-poster"
        src={TMDB_IMG + movie.poster_path}
      />
      {hovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white text-sm p-2 rounded-b-md z-10">
          {movie.overview
            ? movie.overview.length > 100
              ? movie.overview.slice(0, 100) + "..."
              : movie.overview
            : "No description available."}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
