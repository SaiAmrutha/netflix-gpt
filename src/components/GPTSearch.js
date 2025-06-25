import { BG_IMG } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <div>
      <img className="fixed -z-10" src={BG_IMG} alt="background-image" />
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
