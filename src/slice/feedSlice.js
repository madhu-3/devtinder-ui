import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    userFeed: null,
  },
  reducers: {
    addUserFeed(state, action) {
      state.userFeed = action.payload;
    },
  },
});

export const { addUserFeed } = feedSlice.actions;
export default feedSlice.reducer;
