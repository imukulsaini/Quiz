import React from "react";
import { QuizResultHeaderProps } from "../types/quizresult.types";

export function QuizResultHeader({
  score,
  displayName,
}: QuizResultHeaderProps) {
  return (
    <>
      <h2 className="text-4xl text-paragraph-text font-medium mb-10">
        Thanks For Playing{" "}
      </h2>
      <div className="flex justify-evenly w-full mb-5">
        <span className="text-3xl mt-2"> {displayName} </span>
        <span className="text-3xl mt-2">Your Score : {score}</span>
      </div>
    </>
  );
}
