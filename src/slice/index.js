import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestReducer from "./requestSlice";
import connectionReducer from "./connectionsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    request: requestReducer,
    connection: connectionReducer,
  },
});
export default store;
