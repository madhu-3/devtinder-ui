import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../slice/connectionsSlice";
import ListCard from "../Common/ListCard";
import NoConnections from "../NoConnections/NoConnections";

const Connections = () => {
  const dispatch = useDispatch();
  const userConnections = useSelector(
    (state) => state.connection.userConnections
  );
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (userConnections.length === 0) {
    return <NoConnections />;
  }
  return (
    userConnections && (
      <div className="flex flex-col items-center gap-y-4 my-2">
        {userConnections.map((item) => {
          return <ListCard key={item._id} user={item} isConnection={true} />;
        })}
      </div>
    )
  );
};

export default Connections;
