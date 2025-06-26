import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import VideoTitle from "./VideoTitle";

const MovieTrailerOverlay = ({ movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          API_OPTIONS
        );
        const data = await res.json();
        const trailer = data?.results?.find((vid) => vid.type === "Trailer");
        setTrailerKey(trailer?.key);
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    };
    fetchTrailer();
  }, [movie.id]);

  if (!movie) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-85 overflow-y-auto">
      {/* close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-white text-3xl z-50"
      >
        ❌
      </button>
      {/* Movie info title */}
      <div className="relative z-10">
        <VideoTitle
          title={movie.original_title || movie.title}
          overview={movie.overview}
        />
      </div>

      {/* Video/Trailer */}
      <div className="relative z-0">
        {trailerKey ? (
          <iframe
            className="w-screen aspect-video"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        ) : (
          <div className="text-white text-center pt-40">
            Loading trailer.............
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTrailerOverlay;
