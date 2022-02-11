import React, { Dispatch } from "react";

export type QuizNames = {
  uid: string;
  quizName: string;
  imageUrl: string;
};

export type Score = {
  quizScore: number;
  uid: string;
};

export type Options = {
  isRight: boolean;
  text: string;
};

export type QuizQuestions = {
  uid: string;
  negativePoints: number;
  options: Options[];
  positivePoints: number;
  text: string;
};

export type UserSelectedOptions = {
  questionID: string;
  userSelectAnswer: string;
  isOptionRight: boolean;
};

export type UserAnswer = {
  quizName: string;
  userSelectedOptions: UserSelectedOptions[];
  score: number;
};

export type QuizInitialState = {
  quizNames: QuizNames[];
  score: Score[];
  quizQuestions: QuizQuestions[];
  userAnswers: UserAnswer;
};

export type QuizActions =
  | { type: "GET_QUIZ_NAME"; payload: QuizNames[] }
  | {
      type: "SET_QUIZ_QUESTIONS";
      payload: QuizQuestions[];
    }
  | { type: "USER_SELECTED_ANSWER"; payload: UserAnswer };

export type QuizContextProps = {
  quizState: QuizInitialState;
  quizDispatch: Dispatch<QuizActions>;
};
