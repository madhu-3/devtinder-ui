import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../slice/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(addUser(null));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = () => {
    navigate("/");
  };
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are You Sure You want to Logout?
          </h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={handleLogout}>
                Ok
              </button>
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Logout;
