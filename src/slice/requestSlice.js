import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {
    userRequests: [],
  },
  reducers: {
    addRequests(state, action) {
      state.userRequests = action.payload;
    },
    removeRequests(state, action) {
      state.userRequests = action.payload;
    },
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;
