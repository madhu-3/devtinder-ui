import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../../slice/feedSlice";
import UserCard from "../Common/UserCard";
import nofeed from "../../assets/nofeed.webp";

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

  const handleFeedRequest = async (type, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${type}/${id}`,
        {},
        { withCredentials: true }
      );
      fetchFeed();
    } catch (err) {
      console.log(err);
    }
  };
  if (!userFeed || userFeed?.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center">
          <img src={nofeed} alt="No Feed" className="w-64 h-64 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No New Users yet
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Don't Worry, Dev Tinder is growing, More Users Coming up
          </p>
        </div>
      </div>
    );
  }
  return (
    userFeed && (
      <>
        <div className="flex items-center my-10 flex-col gap-y-10">
          {userFeed.map((user) => {
            return (
              <UserCard
                key={user?._id}
                user={user}
                handleFeedRequest={handleFeedRequest}
              />
            );
          })}
        </div>
      </>
    )
  );
};

export default Feed;
