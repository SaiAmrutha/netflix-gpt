import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const MovieDetails = ({ movieId, onClose }) => {
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const [detailsRes, creditRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            API_OPTIONS
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits`,
            API_OPTIONS
          ),
        ]);

        const detailsData = await detailsRes.json();
        const creditsData = await creditRes.json();

        setDetails(detailsData);
        setCast(creditsData.cast?.slice(0, 5) || []);
        setCrew(
          creditsData.crew?.filter(
            (member) => member.job === "Director" || member.job === "Writer"
          ) || []
        );
      } catch (error) {
        console.error("Error fetching movie info:", error);
      }
    };
    fetchMovieInfo();
  }, [movieId]);

  if (!details) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 p-8 text-white">
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-white text-3xl z-50"
      >
        ❌
      </button>

      <h1 className="text-3xl font-bold mb-2">
        {details.title} ({details.release_date?.slice(0, 4)})
      </h1>
      <p className="italic mb-4">Tagline : {details.tagline}</p>
      <p className="mb-2">
        🎥 <strong>Genres : </strong>
        {details.genres?.map((g) => g.name).join(", ") || "N/A"}
      </p>
      <p className="mb-2">
        ⌛ <strong>Runtime : </strong>
        {details.runtime || "N/A"} mins
      </p>
      <p className="mb-2">
        ⭐ <strong>Rating : </strong>
        {details.vote_average || "N/A"}/10
      </p>
      <p className="mb-2">
        ✍ <strong>Director/Writer : </strong>
        {crew.map((c) => c.name).join(", ") || "N/A"}
      </p>
      <p className="mb-2">
        👩👨 <strong>Top Cast : </strong>
        {cast.map((c) => c.name).join(", ") || "N/A"}
      </p>
    </div>
  );
};

export default MovieDetails;
