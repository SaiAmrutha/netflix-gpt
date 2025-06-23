const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-40 absolute text-white bg-gradient-to-r from-black">
      <h1 className="font-bold text-5xl">{title}</h1>
      <p className="py-6 text-lg w-2/4">{overview}</p>
      <div>
        <button className=" bg-gray-600 text-white p-4  px-10  text-2xl bg-opacity-50 font-bold rounded-sm hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="mx-3 bg-gray-600 text-white p-4  px-10 text-2xl bg-opacity-50 font-bold rounded-sm hover:bg-opacity-80">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
