import React from "react";
import { BASE_URL } from "../../constants/constants";
import defaultImg from "../../assets/defaultImg.jpeg";

const UserCard = ({
  user,
  handleFeedRequest = () => {},
  preview,
  isProfileView = false,
}) => {
  const { _id, firstName, lastName, age, about, gender, photoUrl } = user;
  return (
    <div className="card bg-base-300 w-96 h-1/3 shadow-xl overflow-hidden">
      <figure>
        <img
          src={
            isProfileView
              ? preview
              : photoUrl
              ? BASE_URL + photoUrl
              : defaultImg
          }
          alt="feed user photo"
          className="w-full h-72 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{`${age} ${gender}`}</p>}
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleFeedRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleFeedRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
