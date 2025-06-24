import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import moviesReducer from "./moviesSlice";
import GPTReducer from "./useGPTSlice";
import userReducer from "./userSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    GPT: GPTReducer,
    config: configReducer,
  },
});
export default appStore;
