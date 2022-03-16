import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/Auth/auth";
import { useQuiz } from "../../../context/Quiz/Quiz";
import { addQuizScore } from "../../../firebase/firebase.config";
import { getQuizName } from "../utils/quizQuestion.utils";
import { useTimer } from "../hook/useTimer";
import {
  AnswerHandlerProps,
  NextQuestion,
  QuizQuestionsProps,
  QuizQuestionsShowProps,
  UserAnswersValues,
} from "../types/quizQues.types";

export function QuizQuestionsShow({ isModalInfo }: QuizQuestionsProps) {
  const [questions, setQuestions] = useState<QuizQuestionsShowProps[]>([]);
  const [userSelectedOptions, setUserOptions] = useState<UserAnswersValues[]>(
    []
  );

  const {
    quizState: { quizQuestions, quizNames },

    quizDispatch,
  } = useQuiz();

  const {
    state: { userData },
  } = useAuth();

  const { start, stop, seconds } = useTimer(30);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [quizStatus, setQuizStatus] = useState<string>("idle");
  const [userPoints, setUserPoints] = useState<number>(0);

  const navigate = useNavigate();
  const { quizID, quizName } = useParams();

  useEffect(() => {
    if (isModalInfo === false) {
      setQuizStatus("start");
      setCurrentQuestion(0);
      start();
    }
  }, [isModalInfo]);

  useEffect(() => {
    setQuestions(quizQuestions);
  }, [quizQuestions]);

  function nextQuestion(answer: NextQuestion): void {
    setUserOptions((userOptions) => [...userOptions, answer]);
    stop();
    if (currentQuestion + 1 === questions.length) {
      setQuizStatus("finished");
    } else {
      setCurrentQuestion((current) => current + 1);
      start();
    }
  }

  function skipTimeOutHandler(): void {
    const answer = {
      questionID: "skip",
      isOptionRight: false,
      userSelectAnswer: "skip",
    };

    nextQuestion(answer);
  }

  useEffect(() => {
    if (seconds === 0) {
      skipTimeOutHandler();
    }
  }, [seconds]);

  useEffect(() => {
    if (quizStatus === "finished" && quizID && quizNames) {
      const name = getQuizName({ quizID, quizNameData: quizNames });
      if (name) {
        stop();
        navigate(`/quiz/${quizName}/result`);

        addQuizScore({
          userID: userData?.uid,
          score: userPoints,
          quizName: name,
        });

        quizDispatch({
          type: "USER_SELECTED_ANSWER",
          payload: {
            quizName: name,
            userSelectedOptions: userSelectedOptions,
            score: userPoints,
          },
        });
      }
    }
  }, [quizStatus]);

  function answerHandler({ isOptionRight, userAnswer }: AnswerHandlerProps) {
    const answer = {
      questionID: questions[currentQuestion].uid,
      isOptionRight: isOptionRight,
      userSelectAnswer: userAnswer,
    };

    setUserPoints((userPoints) =>
      isOptionRight ? userPoints + 2 : userPoints
    );

    nextQuestion(answer);
  }

  return (
    <div className="quiz-question flex flex-col gap-6 w-10/12 h-3/4 bg-white rounded-lg pt-10 shadow-md pl-10 pr-10 rounded-md mt-10 mb-10">
      <div className="flex mt-2 justify-between items-center h-12  rounded-md">
        <div className="pl-4 font-medium">
          <span className="text-lg">
            Question : {currentQuestion + 1}/{quizQuestions.length}
          </span>
        </div>

        <div className="pr-4 font-medium">
          <span className="text-lg text-paragraph-text">{seconds}s</span>
        </div>
      </div>
      {/* Quiz Header */}

      <div
        className="flex flex-col items-center gap-6
          "
      >
        <div key={currentQuestion} className="text-center">
          <span
            className="text-4xl font-medium text-headline 
    "
          >
            {quizQuestions[currentQuestion]?.text} ?
          </span>
        </div>
        {/* Quiz Questions And Options */}

        <div
          className="w-9/12 flex flex-col gap-3 
            "
        >
          {quizQuestions[currentQuestion]?.options.map(
            (questionOption, index) => {
              return (
                <span
                  onClick={() =>
                    !isModalInfo &&
                    answerHandler({
                      isOptionRight: questionOption.isRight,
                      userAnswer: questionOption.text,
                    })
                  }
                  className="border-background shadow-md cursor-pointer pl-5
                    bg-background p-2 rounded-md"
                >
                  {questionOption.text}
                </span>
              );
            }
          )}
        </div>
      </div>

      {/* Quiz Actions Buttons */}

      <div className="flex justify-end gap-10  p-5 ">
        <button
          onClick={() => !isModalInfo && skipTimeOutHandler()}
          className="border-2 focus:ring-2 px-3.5 py-2 text-white bg-highlight border border-highlight rounded-md"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
