import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserAvatar } from "../utils/avatar";
import { BG_IMG } from "../utils/constants.js";

import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice.js";
import { checkValidData } from "../utils/Validate.js";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const avatarUrl = getUserAvatar(name);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  // validate the form data
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;
    //sign in / sign up logic
    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // signed In
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: getUserAvatar(name),
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // profile updated
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: getUserAvatar(displayName),
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // signed In
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover md:h-screen -z-10 fixed top-0 left-0 w-full"
          src={BG_IMG}
          alt="background-image"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full absolute md:w-3/12 p-5 bg-black text-white my-60 mx-auto left-0 right-0 bg-opacity-80"
      >
        <h1 className="font-bold text-2xl p-5">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="name"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-600 rounded-lg"
          ></input>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full  bg-gray-600 rounded-lg"
        />
        <p className="text-red-800 font-bold">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-bold cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to SmartFlix? Sign up now"
            : "Already registered? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
