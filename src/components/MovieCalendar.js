import { getDaysInMonth } from "date-fns";
import { useEffect, useState } from "react";
import { API_OPTIONS, TMDB_IMG } from "../utils/constants";
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MovieCalendar = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [moviesByDate, setMoviesByDate] = useState({});

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); //0 based index

  useEffect(() => {
    const totalDays = getDaysInMonth(new Date(year, month));
    const daysArr = Array.from({ length: totalDays }, (_, i) => i + 1);
    setDays(daysArr);
  }, [year, month]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
          API_OPTIONS
        );
        const data = await res.json();
        const filtered = data.results.filter((movie) => {
          const date = new Date(movie.release_date);
          return date.getMonth() === month && date.getFullYear() === year;
        });

        const grouped = {};
        filtered.forEach((movie) => {
          const date = new Date(movie.release_date).getDate();
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(movie);
        });

        setMoviesByDate(grouped);
      } catch (err) {
        console.error("Failed to fetcb movies:", err);
      }
    };
    fetchUpcomingMovies();
  }, [year, month]);

  return (
    <div className="relative mt-3  md:pr-3 text-white transform w-[400px]  md:w-[980px] h-[600px]  md:overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-1 right-4 text-white text-3xl z-50"
      >
        ❌
      </button>
      <h1 className="text-lg md:text-3xl font-bold mb-4 md:mb-8 text-center">
        Upcoming Releases - {today.toLocaleString("default", { month: "long" })}
      </h1>
      {/* dates header */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-center ">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="text-2xl font-semibold border-4 border-red-600 rounded-full"
          >
            {day}{" "}
          </div>
        ))}
      </div>

      {/* dates grid */}
      <div className="grid grid-cols-7 gap-2 mb-6 text-2xl">
        {days.map((day) => {
          const hasMovie = moviesByDate[day]?.length > 0;
          return (
            <div
              key={day}
              className={`cursor-pointer text-center p-2 rounded-full 
              ${selectedDate === day ? "bg-red-600" : "bg-gray-700"}
           ${hasMovie ? "border-4 border-red-500" : ""}
           hover:bg-red-500 transition duration-200`}
              onClick={() => setSelectedDate(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* movie list */}
      <div>
        <h2 className="text-lg mg-2 font-semibold">
          Movies releasing on{" "}
          {selectedDate
            ? `${selectedDate} ${today.toLocaleString("default", {
                month: "short",
              })}`
            : "..."}
        </h2>
        <ul className="list-disc ml-5 w-40">
          {/* placeholder movies will be replaced with API data */}
          {selectedDate ? (
            moviesByDate[selectedDate]?.length > 0 ? (
              moviesByDate[selectedDate].map((movie) => (
                <div key={movie.id}>
                  <img
                    src={TMDB_IMG + movie.poster_path}
                    alt={movie.title}
                    className="rounded-md mx-auto hover:scale-105 transition-transform duration-300"
                  ></img>
                  <li key={movie.id}>{movie.title}</li>
                </div>
              ))
            ) : (
              <li className="w-60">No movies releasing on this date</li>
            )
          ) : (
            <li className="md:w-[400%]">
              Click on a date to see movies specially the red border ones
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MovieCalendar;
