import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import CustomToast from "../Common/CustomToast";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastObj, setToastObj] = useState({ type: "", message: "" });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      about: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(4, "Must be atleast 4 characters or more")
        .max(30, "Must be 30 characters or less")
        .required("First Name must not be empty"),
      lastName: Yup.string()
        .min(1, "Must be atleast 1 character or more")
        .max(30, "Must be 30 characters or less"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email must not be empty"),
      age: Yup.number().min(18, "You must be atleast 18 years old"),
      gender: Yup.string().required("Please Choose Gender"),
      password: Yup.string().required("Password must not be empty"),
    }),
    onSubmit: (values) => {
      saveProfile(values);
    },
  });

  const saveProfile = async (values) => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`, values, {
        withCredentials: true,
      });
      setShowToast(true);
      setToastObj({
        type: "success",
        message: "Account Creation Successfull!",
      });
    } catch (err) {
      console.log(err);
      setShowToast(true);
      setToastObj({
        type: "error",
        message: "Failed to create please try again!",
      });
    } finally {
      setTimeout(() => {
        setShowToast(false);
        setToastObj({ type: "", message: "" });
      }, 3000);
    }
  };

  return (
    <form
      className="flex justify-center mt-4 gap-x-2"
      onSubmit={formik.handleSubmit}
    >
      <div className="card bg-base-200 w-96">
        <div className="card-body items-center text-center gap-y-4">
          <h1>Create Your Account</h1>
          <div>
            <p className="font-bold">
              Already have an Account?{" "}
              <Link to="/login" className="text-blue-700">
                Login
              </Link>
            </p>
          </div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email: </span>
            </div>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="input input-bordered w-full max-w-xs"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="label">
                <span className="label-text text-red-600">
                  {formik.errors.email}{" "}
                </span>
              </div>
            ) : null}
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Firstname: </span>
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="input input-bordered w-full max-w-xs"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="label">
                <span className="label-text text-red-600">
                  {formik.errors.firstName}{" "}
                </span>
              </div>
            ) : null}
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Lastname: </span>
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className="input input-bordered w-full max-w-xs"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="label">
                <span className="label-text text-red-600">
                  {formik.errors.lastName}{" "}
                </span>
              </div>
            ) : null}
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Age: </span>
            </div>
            <input
              type="text"
              id="age"
              name="age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
              className="input input-bordered w-full max-w-xs"
            />
            {formik.touched.age && formik.errors.age ? (
              <div className="label">
                <span className="label-text text-red-600">
                  {formik.errors.age}{" "}
                </span>
              </div>
            ) : null}
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Gender:</span>
            </div>
            <select
              name="gender"
              id="gender"
              className="select select-bordered"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
            >
              <option value={""}></option>
              <option value={"male"}>Male</option>
              <option value={"female"}> Female</option>
              <option value={"others"}>Others</option>
            </select>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="label">
                <span className="label-text text-red-600">
                  {formik.errors.gender}{" "}
                </span>
              </div>
            ) : null}
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">About: </span>
            </div>
            <textarea
              name="about"
              id="about"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.about}
              className="textarea textarea-bordered h-24"
              placeholder="About.."
            ></textarea>
            {formik.touched.about && formik.errors.about ? (
              <div className="label">
                <span className="label-text text-red-600">
                  {formik.errors.about}{" "}
                </span>
              </div>
            ) : null}
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password: </span>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="input input-bordered w-full max-w-xs"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="label">
                <span className="label-text text-red-600">
                  {formik.errors.password}{" "}
                </span>
              </div>
            ) : null}
          </label>
          <button className="btn btn-primary" type="submit">
            Signup
          </button>
        </div>
      </div>
      {showToast && <CustomToast {...toastObj} />}
    </form>
  );
};

export default Signup;
