import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "request",
  initialState: {
    userConnections: [],
  },
  reducers: {
    addConnections(state, action) {
      state.userConnections = action.payload;
    },
    removeConnections(state, action) {
      state.userConnections = action.payload;
    },
  },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
