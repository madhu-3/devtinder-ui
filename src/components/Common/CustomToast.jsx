import React from "react";

const CustomToast = ({ message, type }) => {
  console.log(type);
  return (
    <div className="toast toast-center toast-bottom">
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default CustomToast;
