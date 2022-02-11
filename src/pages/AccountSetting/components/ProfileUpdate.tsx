import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "../../../components/Spinner/LoadingSpinner";
import { useAuth } from "../../../context/Auth/auth";
import { updateProfileData } from "../../../firebase/firebase.config";
import { toast } from "react-toastify";
import { ProfileUpdateValues } from "../types/account.types";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export function ProfileUpdate(index: any) {
  const {
    setValue,
    getValues,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileUpdateValues>();
  const {
    state: { userData, isUserLogin },
    dispatch,
  } = useAuth();

  const [loading, setLoading] = useState<string>("idle");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isUserLogin && userData) {
      setValue("displayName", userData.displayName);
      setValue("email", userData.email);
    }
  }, [isUserLogin, userData]);

  async function updateUserInfo(data: ProfileUpdateValues) {
    setLoading("pending");
    const { displayName, email } = data;
    if (displayName && email) {
      const response = await updateProfileData(displayName, email);

      if (typeof response === "object" && "errMessage" in response) {
        setError(response.errMessage);
        setLoading("rejected");
      } else {
        setLoading("fulfilled");
        dispatch({
          type: "UPDATE_USER_DATA",
          payload: {
            displayName,
            email,
          },
        });
        toast.success("profile updated", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          progress: undefined,
        });
      }
    }
  }

  return (
    <div className="profile-update">
      <div className="py-1">
        <form
          className=" bg-white mb-0 space-y-6"
          onSubmit={handleSubmit(updateUserInfo)}
        >
          <div className="flex flex-col gap-2">
            <label className="block font-medium  text-paragraph-text">
              Profile Name
            </label>
            <input
              {...register("displayName", {
                required: true,
              })}
              type="text"
              className=" w-11/12 border-1 border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block font-medium   text-paragraph-text">
              Email
            </label>
            <input
              {...register("email", {
                required: true,
              })}
              type="email"
              className=" w-11/12 border-1 border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          {loading === "rejected" && error && (
            <span className="text-red-500 text-sm italic pl-1 my-1">
              {error}
            </span>
          )}
          <div className="text-start">
            <button
              type="submit"
              className="w-28
              h-10
              border-2 border-highlight text-white text-bold bg-highlight rounded-md"
            >
              Save
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
      </div>
    </div>
  );
}
