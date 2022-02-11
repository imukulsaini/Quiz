import React from "react";

export type QuizInfoModalProps = {
  isInfoQuizModal: boolean;
  closeInfoModal: () => void;
};

export type Options = {
  isRight: boolean;
  text: string;
};

export type QuizQuestionsShowProps = {
  uid: string;
  negativePoints: number;
  options: Options[];
  positivePoints: number;
  text: string;
};

export type QuizQuestionsProps = {
  isModalInfo: boolean;
};

export type UserAnswersValues = {
  questionID: string;
  userSelectAnswer: string;
  isOptionRight: boolean;
};

export type AnswerHandlerProps = {
  isOptionRight: boolean;
  userAnswer: string;
};

export type NextQuestion = {
  questionID: string;
  isOptionRight: boolean;
  userSelectAnswer: string;
};

export type QuizNames = {
  uid: string;
  quizName: string;
  imageUrl: string;
};

export type GetQuizName = {
  quizID: string;
  quizNameData: QuizNames[];
};
