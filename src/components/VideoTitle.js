const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-40 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-2/4">{overview}</p>
      <div className="my-4 md:m-0">
        <button className=" bg-gray-600 text-white px-3 md:p-4 md:px-10 text-2xl bg-opacity-50 font-bold rounded-sm hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="hidden md:inline-block mx-12 bg-gray-600 text-white px-3 md:p-4  md:px-6 text-2xl bg-opacity-50 font-bold rounded-sm hover:bg-opacity-80">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
