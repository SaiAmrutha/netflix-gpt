import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAvatar } from "../utils/avatar";
import { changeLanguage } from "../utils/configSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { toggleGptSearchView } from "../utils/useGPTSlice";
import { addUser, removeUser } from "../utils/userSlice";
import MovieCalendar from "./MovieCalendar";

const Header = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleGPTSearchClick = () => {
    // toggle GPT search
    dispatch(toggleGptSearchView());
  };

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const showGPTSearch = useSelector((store) => store.GPT.showGPTSearch);
  const handleLangChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // sign-out successful
      })
      .catch((error) => {
        // an error happened
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL || getUserAvatar(displayName || email || "USER"),
          })
        );
        navigate("/browse");
      } else {
        // user is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-30 flex flex-col md:flex-row justify-between">
      <span className="text-red-600 font-extrabold text-4xl md:text-6xl whitespace-nowrap text-center md:flex-row md:justify-between">
        Smart<span className="text-white">Flix</span>
      </span>

      {user && (
        <div className="flex p-2">
          <button
            onClick={() => setShowCalendar(true)}
            className="py-2  my-2  text-5xl"
          >
            📅
          </button>

          {showGPTSearch && (
            <select
              className="p-2 m-2 bg-gray-600 text-white"
              onChange={handleLangChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="bg-blue-800 text-white font-bold rounded-lg py-2 px-4 my-2 mx-3"
            onClick={handleGPTSearchClick}
          >
            {showGPTSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className="hidden md:block w-12 h-12 my-2 mx-3"
            alt="user-icon"
            src={user?.photoURL}
            onError={(e) => {
              e.target.src = getUserAvatar(user?.displayName || "User");
            }}
          />
          <button
            onClick={handleSignOut}
            className="bg-slate-500 text-white font-bold my-2 mx-3 px-2"
          >
            Sign Out
          </button>
        </div>
      )}

      {showCalendar && (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-[#111] text-white md:p-6 rounded-lg w-[90%] md:w-[600px] max-h-[80vh] shadow-2xl">
            <MovieCalendar onClose={() => setShowCalendar(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
