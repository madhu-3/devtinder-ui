import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEnvelope,
  faMessage,
  faSquareCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { BASE_URL } from "../../constants/constants";
import defaultImg from "../../assets/defaultImg.jpeg";
import { Link } from "react-router-dom";

const ListCard = ({
  user,
  handleConnectionRequest,
  requestId,
  isConnection = false,
}) => {
  const { _id, firstName, lastName, age, about, gender, photoUrl } = user;
  return (
    <div className="w-full lg:w-3/4 bg-base-300 shadow-xl rounded-lg flex justify-between p-2 gap-x-4 items-center">
      <img
        className="w-20 h-20 rounded-full"
        src={photoUrl ? BASE_URL + photoUrl : defaultImg}
        alt="user badge photo"
      />
      <div className="grow">
        <h4 className="">{firstName + " " + lastName}</h4>
        {age && gender && <p>{`${age} ${gender}`}</p>}
        <p>{about}</p>
      </div>
      {isConnection ? (
        <div>
          <Link
            to={`/chat/${_id}`}
            state={{ photoUrl: photoUrl, firstName, lastName }}
          >
            <button className="btn btn-primary hidden sm:block">Message</button>
          </Link>
          <div className="sm:hidden text-secondary">
            <Link
              to={`/chat/${_id}`}
              state={{ photoUrl: photoUrl, firstName, lastName }}
            >
              <FontAwesomeIcon icon={faMessage} size="xl" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden sm:flex gap-1">
            <button
              className="btn btn-primary"
              onClick={() => handleConnectionRequest("accepted", requestId)}
            >
              Accept
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleConnectionRequest("rejected", requestId)}
            >
              Reject
            </button>
          </div>
          <div className="flex gap-1 sm:hidden">
            <span
              className="text-primary"
              onClick={() => handleConnectionRequest("accepted", requestId)}
            >
              <FontAwesomeIcon icon={faCircleCheck} size="2xl" />
            </span>
            <span
              className="text-secondary"
              onClick={() => handleConnectionRequest("rejected", requestId)}
            >
              <FontAwesomeIcon icon={faXmark} size="2xl" />
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ListCard;
