import { Navbar } from "../../components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { createNewUser } from "../../firebase/firebase.config";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/auth";
import { useForm } from "react-hook-form";
import { SignupFormValues } from "./types/signup.types";
import { ReactComponent as BrandLogo } from "../../logo.svg";

import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";

export function SignUp() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();
  const {
    state: { isUserLogin },
  } = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function signupUser(data: SignupFormValues) {
    setLoading("pending");

    const { firstName, lastName, email, password } = data;
    const response = await createNewUser(firstName, lastName, email, password);
    if ("errMessage" in response) {
      setLoading("rejected");
      setError(response.errMessage);
    } else {
      setLoading("fulfilled");
      navigate("/");
    }
  }

  return (
    <div className="bg-primary w-full h-screen">
      <Navbar />
      <section className="sign-up-main mt-2 p-1 grid wrap justify-items-center">
        <div className="sign-up w-5/12 bg-white py-8 px-6 shadow-lg rounded-lg">
          <div className="flex justify-center h-12 gap-2 mb-5">
            <BrandLogo />
            <h2 className="text-4xl text-paragraph-text font-bold">Sign up</h2>
          </div>
          <form
            className=" bg-white mb-0 space-y-6"
            onSubmit={handleSubmit(signupUser)}
          >
            <div className="flex flex-wrap ">
              <div className="w-11/12 md:w-1/2 md:mb-0">
                <label className="block font-medium text-paragraph-text mb-2">
                  First Name
                </label>
                <input
                  {...register("firstName", {
                    required: true,
                  })}
                  type="text"
                  placeholder="First Name"
                  className="w-11/12 border-1 border-gray-300 rounded-lg shadow-sm"
                />

                {errors.firstName && (
                  <span className="text-red-500 text-sm italic pl-1">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className="w-11/12 md:w-1/2 md:mb-0">
                <label className="block font-medium  text-paragraph-text mb-2">
                  Last Name
                </label>
                <input
                  {...register("lastName", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Last Name"
                  className="w-11/12 border-1 border-gray-300 rounded-lg shadow-sm"
                />

                {errors.lastName && (
                  <span className="text-red-500 text-sm italic pl-1">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="block font-medium text-paragraph-text">
                Email
              </label>
              <input
                {...register("email", {
                  required: true,
                })}
                type="email"
                className=" w-11/12 border-1 border-gray-300 rounded-lg shadow-sm"
              />

              {errors.email && (
                <span className="text-red-500 text-sm italic pl-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="block font-medium  text-paragraph-text">
                Password
              </label>
              <input
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                    message:
                      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character !",
                  },
                })}
                type="password"
                className=" w-11/12 border-1 border-gray-300 rounded-lg shadow-sm"
              />
              {errors.password && (
                <span className="text-red-500 text-sm italic pl-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="block font-medium text-paragraph-text">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: {
                    passwordEqual: (value) =>
                      value === getValues("password") || "Password Don't Match",
                  },
                })}
                type="password"
                className=" w-11/12 border-1 border-gray-300 rounded-lg shadow-sm"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm italic pl-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            {loading === "rejected" && error && (
              <span className="text-red-500 text-sm italic pl-1">{error}</span>
            )}
            <div className="text-center">
              <button
                type="submit"
                className="w-32 h-10
                text-button-text text-lg
                border-highlight bg-highlight rounded-md"
              >
                Sign Up
                {loading === "pending" && (
                  <span className="w-1 ml-2">
                    <LoadingSpinner
                      color={"#fffff"}
                      isDefaultCss={false}
                      size={13}
                    />
                  </span>
                )}
              </button>
            </div>
          </form>
          <div className="text-center">
            <span className="block text-gray-400 mt-2">
              or
              <span className="block">
                Already Registered
                <NavLink to="/login" className="pl-3 text-highlight">
                  Login
                </NavLink>
              </span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
