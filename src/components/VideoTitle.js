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
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-40 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-2/4">{overview}</p>
      <div className="my-4 md:m-0">
        <button
          onClick={togglePlayback}
          className=" bg-gray-600 text-white px-3 md:p-4 md:px-10 text-2xl bg-opacity-50 font-bold rounded-sm hover:bg-opacity-80"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          onClick={() => setShowDetails(true)}
          className="hidden md:inline-block mx-12 bg-gray-600 text-white px-3 md:p-4  md:px-6 text-2xl bg-opacity-50 font-bold rounded-sm hover:bg-opacity-80 z-20"
        >
          ℹ More Info
        </button>
        <button
          onClick={toggleMute}
          className=" bg-gray-600 text-white px-3 md:p-4 md:px-10 text-2xl bg-opacity-50 font-bold rounded-sm hover:bg-opacity-80"
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
