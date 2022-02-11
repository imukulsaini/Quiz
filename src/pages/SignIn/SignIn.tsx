import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";
import { useAuth } from "../../context/Auth/auth";
import { ReactComponent as BrandLogo } from "../../logo.svg";
import { signInUserWithCredentials } from "../../firebase/firebase.config";
import { SignInFormValues, LocationState } from "./types";

export function SignIn() {
  const { register, handleSubmit, watch, setValue } =
    useForm<SignInFormValues>();
  const [loading, setLoading] = useState<string>("idle");
  const [error, setError] = useState<string>("");
  const checkautoFill = watch("autoFill");

  const navigate = useNavigate();

  const location = useLocation();

  const state = location.state as LocationState;
  const preLocation =
    state !== null && state.from.prevLocation ? state.from.prevLocation : "/";

  useEffect(() => {
    if (checkautoFill === "yes") {
      if (process.env.REACT_APP_EMAIL && process.env.REACT_APP_PASSWORD) {
        setValue("email", process.env.REACT_APP_EMAIL);
        setValue("password", process.env.REACT_APP_PASSWORD);
      }
    } else {
      setValue("email", "");
      setValue("password", "");
    }
  }, [checkautoFill]);

  async function signIn(data: SignInFormValues) {
    setLoading("pending");
    const response = await signInUserWithCredentials(data.email, data.password);
    if ("errMessage" in response) {
      setLoading("rejected");
      setError(response.errMessage);
    } else {
      setLoading("fulfilled");
      navigate(preLocation);
    }
  }
  return (
    <>
      <div className=" h-screen w-full bg-primary">
        <Navbar />
        <section className="sign-in-main mt-10 p-1 grid wrap justify-items-center">
          <div className="sign-in w-5/12 bg-white  py-8 px-6 shadow-lg rounded-lg ">
            <div className="flex justify-center h-12 gap-2">
              <BrandLogo />
              <h2 className="text-4xl text-paragraph-text font-bold">Login</h2>
            </div>
            <form className="mb-0 space-y-6" onSubmit={handleSubmit(signIn)}>
              <div className="flex flex-col gap-2">
                <label className="block font-medium  text-paragraph-text">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: true,
                  })}
                  name="email"
                  type="email"
                  className=" w-11/12 border-1 border-gray-300 
                rounded-lg shadow-sm"
                />
                <span className="text-red-500 text-sm italic pl-1"></span>
              </div>

              <div className="flex flex-col gap-3">
                <label className="block font-medium text-paragraph-text">
                  password
                </label>
                <input
                  {...register("password", {
                    required: true,
                  })}
                  name="password"
                  type="password"
                  className=" w-11/12 border-1 border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              {loading === "rejected" && error && (
                <span className="text-red-500 text-sm italic pl-1">
                  {error}
                </span>
              )}
              <div className="flex gap-2 items-center">
                <input {...register("autoFill")} type="checkbox" value="yes" />
                <label className="form-check-label inline-block text-paragraph-text">
                  Auto Fill
                </label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-32 h-10
                text-button-text text-lg
                border-highlight bg-highlight rounded-md"
                >
                  Sign In
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
              <span className="block text-gray-400 mb-3 mt-2">or</span>
              <Link
                to="/register"
                className=" text-gray-700 w-5/12 border-2 px-6 py-2 text-paragraph-text border-highlight text-paragraph-text rounded-md"
              >
                Create an Account{" "}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
