// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBriOa-pnOVkPU_2U-lHiXQePmMpa8wDy8",
  authDomain: "netflixgpt-d469b.firebaseapp.com",
  projectId: "netflixgpt-d469b",
  storageBucket: "netflixgpt-d469b.firebasestorage.app",
  messagingSenderId: "1091203526768",
  appId: "1:1091203526768:web:7fe0768b026d4e7b4c44b5",
  measurementId: "G-QQX58472Q2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
