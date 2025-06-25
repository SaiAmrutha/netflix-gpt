import { createSlice } from "@reduxjs/toolkit";

const GPTSlice = createSlice({
  name: "GPT",
  initialState: {
    showGPTSearch: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult } = GPTSlice.actions;
export default GPTSlice.reducer;
