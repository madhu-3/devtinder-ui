import React from "react";

const UserCard = ({ user, handleFeedRequest }) => {
  const { _id, firstName, lastName, age, about, gender, photoUrl } = user;
  return (
    <div className="card bg-base-300 w-96 h-1/3 shadow-xl">
      <figure>
        <img src={photoUrl} alt="feed user photo" />
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
