import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../slice/userSlice";
import { BASE_URL } from "../../constants/constants";
const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.userData);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);
      navigate("/login");
      // if (err.status === 401) {
      //   navigate("/login");
      // } else {
      //   console.log(err);
      // }
    }
  };
  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, [userData]);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
