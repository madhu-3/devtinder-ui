import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../../slice/feedSlice";
import UserCard from "../Common/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((state) => state.feed.userFeed);
  const fetchFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addUserFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  return (
    userFeed && (
      <div className="flex items-center my-10 flex-col gap-y-10">
        {userFeed.map((user) => {
          return <UserCard user={user} />;
        })}
      </div>
    )
  );
};

export default Feed;
