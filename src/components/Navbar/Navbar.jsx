import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { BASE_URL } from "../../constants/constants";
import defaultImg from "../../assets/defaultImg.jpeg";
import devlogo from "../../assets/Devtinderlogo.jpeg";

const Navbar = () => {
  const userData = useSelector((store) => store.user.userData);
  return (
    <div className="navbar bg-base-300 h-6">
      <Logout />
      <div className="flex-1">
        <img
          src={devlogo}
          className="w-8 h-24 mix-blend-multiply object-cover"
        />
        <Link to="/" className="btn btn-ghost text-xl">
          Dev Tinder
        </Link>
      </div>
      {userData && (
        <div className="flex-none">
          <p className="pr-2">Welcome {userData.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="UserImage"
                  src={
                    userData.photoUrl
                      ? BASE_URL + userData.photoUrl
                      : defaultImg
                  }
                  onError={(e) => {
                    if (e.target.src !== "/images/fallback.png") {
                      e.target.src = defaultImg;
                    }
                  }}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
