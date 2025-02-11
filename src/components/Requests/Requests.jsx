import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import ListCard from "../Common/ListCard";
import { addRequests } from "../../slice/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const userRequests = useSelector((state) => state.request.userRequests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleConnectionRequest = async (type, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${type}/${id}`,
        {},
        { withCredentials: true }
      );
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };
  if (userRequests.length === 0) {
    return <div className="text-center">No Requests</div>;
  }

  return (
    userRequests && (
      <div className="flex flex-col items-center gap-y-4 my-2">
        {userRequests.map((item) => {
          return (
            <ListCard
              key={item._id}
              user={item.fromUserId}
              handleConnectionRequest={handleConnectionRequest}
              requestId={item._id}
            />
          );
        })}
      </div>
    )
  );
};

export default Requests;
