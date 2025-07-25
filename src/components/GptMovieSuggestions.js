import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = ({ onCardClick }) => {
  const { movieResults, movieNames } = useSelector((store) => store.GPT);
  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      <div>
        {movieNames.map((movieNames, index) => (
          <MovieList
            key={movieNames}
            title={movieNames}
            movies={movieResults[index]}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
