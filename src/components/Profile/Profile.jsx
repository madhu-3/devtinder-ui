import React, { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../slice/userSlice";
import CustomToast from "../CustomToast/CustomToast";
const INIT_PROFILE_STATE = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  about: "",
  photoUrl: "",
};

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.userData);
  const [profileData, setProfileData] = useState(INIT_PROFILE_STATE);
  const [showToast, setShowToast] = useState(false);
  const [toastObj, setToastObj] = useState({ type: "", message: "" });

  useEffect(() => {
    setProfileData({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      age: userData?.age,
      gender: userData?.gender,
      about: userData?.about,
      photoUrl: userData?.photoUrl,
    });
  }, [userData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const saveProfile = async () => {
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, profileData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      setShowToast(true);
      setToastObj({ type: "success", message: "Saved Successfully!" });
    } catch (err) {
      console.log(err);
      setShowToast(true);
      setToastObj({ type: "error", message: "Save Failed!" });
    } finally {
      setTimeout(() => {
        setShowToast(false);
        setToastObj({ type: "", message: "" });
      }, 3000);
    }
  };

  return (
    userData && (
      <div className="flex justify-center mt-4 gap-x-2">
        <div className="card bg-base-200 w-96">
          <div className="card-body items-center text-center gap-y-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Firstname: </span>
              </div>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleFormChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Lastname: </span>
              </div>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleFormChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age: </span>
              </div>
              <input
                type="text"
                name="age"
                value={profileData.age}
                onChange={handleFormChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender:</span>
              </div>
              <select
                name="gender"
                className="select select-bordered"
                value={profileData.gender}
                onChange={handleFormChange}
              >
                <option value={"male"}>Male</option>
                <option value={"female"}> Female</option>
                <option value={"others"}>Others</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About: </span>
              </div>
              <textarea
                name="about"
                value={profileData.about}
                onChange={handleFormChange}
                className="textarea textarea-bordered h-24"
                placeholder="About.."
              ></textarea>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Photo URL: </span>
              </div>
              <input
                type="text"
                name="photoUrl"
                value={profileData.photoUrl}
                onChange={handleFormChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Changes
            </button>
          </div>
        </div>
        <UserCard user={{ ...profileData }} />
        {showToast && <CustomToast {...toastObj} />}
      </div>
    )
  );
};

export default Profile;
