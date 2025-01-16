import React from "react";
import { Link } from "react-router-dom";
import noconnectionsImg from "../../assets/noconnections.webp";

const NoConnections = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={noconnectionsImg}
        alt="No connections"
        className="w-64 h-64 mb-6"
      />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No connections yet
      </h2>
      <p className="text-gray-600 text-center mb-6">
        It looks a little lonely here. Explore the feed to connect with others!
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Explore the Feed
      </Link>
    </div>
  );
};

export default NoConnections;
