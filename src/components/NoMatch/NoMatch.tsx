import React from "react";
import { useNavigate } from "react-router-dom";

export function NoMatch() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-primary">
      <div className="w-full h-full flex  flex-col gap-10 justify-center items-center ">
        <h2 className="text-paragraph-text text-4xl block">
          "Unfortunately the page you are looking for has been moved or
          deleted."
        </h2>
        <button
          onClick={() => navigate("/")}
          className="w-40 h-10 bg-highlight rounded-md cursor-pointer"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
