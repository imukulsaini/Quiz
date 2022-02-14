import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "../../../../components/Navbar/Navbar";
import { useAuth } from "../../../../context/Auth/auth";
import { useQuiz } from "../../../../context/Quiz/Quiz";
import { QuizResultHeader } from "./components/QuizResultHeader";
import { getRightAnswer } from "./utils/quizresult.utils";

export function QuizResult() {
  const {
    quizState: { userAnswers, quizQuestions },
  } = useQuiz();
  const navigate = useNavigate() ;
  const {
    state: { userData },
  } = useAuth();

  useEffect(() => {
    if (userAnswers.quizName === "") {
      navigate("/");
    }
  }, [userAnswers]);
  return (
    <>
      <div className="w-full h-screen bg-primary">
        <Navbar />
        <section className="flex flex-col items-center bg-primary ">
          <QuizResultHeader
            score={userAnswers.score}
            displayName={userData?.displayName}
          />
          {userAnswers.userSelectedOptions.map((options, index) => {
            const quizOptions = quizQuestions[index].options;
            const rightQuizAnswer = getRightAnswer(quizOptions);
            return (
              <div
              key={options.questionID}
              className="w-10/12 h-full border flex flex-col mb-5">
                <span className="text-2xl font-medium text-paragraph-text p-2">
                  How Many Titans ?{quizQuestions[index].text}
                </span>

                <span className="bg-secondary p-1">
                  Right Answer : {rightQuizAnswer[0].text}
                </span>
                {options.userSelectAnswer === "skip" ? (
                  <span className="p-1 bg-blue-200">
                    You skipped question or timeout{" "}
                  </span>
                ) : (
                  <span
                    className={
                      options.isOptionRight
                        ? "p-1 bg-green-200"
                        : "p-1 bg-red-200"
                    }
                  >
                    Your Answer : {options.userSelectAnswer}
                  </span>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
