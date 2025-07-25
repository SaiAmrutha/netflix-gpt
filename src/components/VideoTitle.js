import { useState } from "react";
import MovieDetails from "./MovieDetails";

const VideoTitle = ({ title, overview, iframeRef, movieId }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const sendYTCommand = (funcName) => {
    const iframe = iframeRef?.current;
    if (!iframe) return;

    setTimeout(() => {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: funcName,
          args: [],
        }),
        "*"
      );
    }, 100);
  };

  const togglePlayback = () => {
    sendYTCommand(isPlaying ? "pauseVideo" : "playVideo");
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    sendYTCommand(isMuted ? "unMute" : "mute");
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full pt-[20%] px-6 md:px-40 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
      {!isPlaying && (
        <p className="hidden md:inline-block py-6 text-lg w-2/4 transition-opacity duration-300 ease-in-out">
          {overview}
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-4 my-4 md:my-0">
        <button
          onClick={togglePlayback}
          className=" bg-gray-600 mt-5 text-white px-3 md:p-4 md:px-10 text-2xl bg-opacity-50 font-bold rounded-sm hover:bg-opacity-80"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          onClick={() => setShowDetails(true)}
          className=" bg-gray-600 text-white mt-5 px-3 md:p-4  md:px-6 text-2xl bg-opacity-50 font-bold rounded-sm hover:bg-opacity-80 z-20"
        >
          ℹ More Info
        </button>
        <button
          onClick={toggleMute}
          className=" bg-gray-600 mt-5 text-white px-3 md:p-4 md:px-10 text-2xl bg-opacity-50 font-bold rounded-sm hover:bg-opacity-80"
        >
          {isMuted ? "🔇 Mute" : "🔊 Sound"}
        </button>
      </div>
      {showDetails && (
        <MovieDetails movieId={movieId} onClose={() => setShowDetails(false)} />
      )}
    </div>
  );
};

export default VideoTitle;
