import { TMDB_IMG } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-4">
      <img alt="movie-poster" src={TMDB_IMG + posterPath} />
    </div>
  );
};

export default MovieCard;
