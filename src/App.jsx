import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body/Body";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import { Provider } from "react-redux";
import store from "./slice";
import Feed from "./components/Feed/Feed";
import Connections from "./components/Connections/Connections";
import Requests from "./components/Requests/Requests";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
