import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    gptShow: false,
  },
  reducers: {
    toggleGPT: (state) => {
      state.gptShow = !state.gptShow;
    },
  },
});

export const { toggleGPT } = gptSlice.actions;

export default gptSlice.reducer;
