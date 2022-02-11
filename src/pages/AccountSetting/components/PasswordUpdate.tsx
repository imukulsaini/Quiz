import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/Spinner/LoadingSpinner";
import { toast } from "react-toastify";
import { updateUserPassword } from "../../../firebase/firebase.config";
import { PasswordUpdateValues } from "../types/account.types";

export function PasswordUpdate() {
  const [loading, setLoading] = useState<string>("idle");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordUpdateValues>();

  async function updatePassword(data: PasswordUpdateValues) {
    setLoading("pending");
    const { currentPassword, newPassword } = data;
    const response = await updateUserPassword(currentPassword, newPassword);
    if (typeof response === "object" && "errMessage" in response) {
      if (
        response.errMessage === "loginAgain" ||
        response.errMessage === "unauthorized user"
      ) {
        return navigate("/login");
        //signout options ;
      }
      setError(response.errMessage);
      setLoading("rejected");
    } else {
      setLoading("fulfilled");
      toast.success("password changed", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="password-update ">
      <form
        className=" bg-white mb-5 space-y-6 "
        onSubmit={handleSubmit(updatePassword)}
      >
        <div className="flex flex-col gap-3">
          <label className="block font-medium text-paragraph-text">
            Current Password
          </label>
          <input
            {...register("currentPassword", {
              required: true,
            })}
            type="password"
            className=" w-11/12 border-1 border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="block font-medium text-paragraph-text">
            New Password
          </label>
          <input
            {...register("newPassword", {
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
          {errors.newPassword && (
            <span className="text-red-500 text-sm italic pl-1 my-1">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        {loading === "rejected" && error && (
          <span className="text-red-500 text-sm italic pl-1 my-1">{error}</span>
        )}
        <div className="text-start">
          <button
            type="submit"
            className="w-48
            h-10
            border-2 border-highlight text-white text-bold bg-highlight rounded-md"
          >
            Update Password
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
  );
}
