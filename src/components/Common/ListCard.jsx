import React from "react";

const ListCard = ({ user, isConnection = false }) => {
  const { firstName, lastName, age, about, gender, photoUrl } = user;
  return (
    <div className="w-1/2 h-28 bg-base-300 shadow-xl rounded-lg flex justify-between p-2 gap-x-4 items-center">
      <img
        className="w-20 h-20 rounded-full"
        src={photoUrl}
        alt="user badge photo"
      />
      <div className="grow">
        <h4 className="">{firstName + " " + lastName}</h4>
        {age && gender && <p>{`${age} ${gender}`}</p>}
        <p>{about}</p>
      </div>
      {isConnection ? (
        <div>
          <button className="btn btn-primary">Message</button>
        </div>
      ) : (
        <div className="flex gap-1">
          <button className="btn btn-primary">Accept</button>
          <button className="btn btn-secondary">Reject</button>
        </div>
      )}
    </div>
  );
};

export default ListCard;
