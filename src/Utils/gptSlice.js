import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    gptShow: false,
    gptMoviesResult: [],
    gptMoviesName: [],
  },
  reducers: {
    toggleGPT: (state) => {
      state.gptShow = !state.gptShow;
    },
    addGptMovies: (state, action) => {
      state.gptMoviesName = action.payload.names;
      state.gptMoviesResult = action.payload.result;
    },
  },
});

export const { toggleGPT, addGptMovies } = gptSlice.actions;

export default gptSlice.reducer;
