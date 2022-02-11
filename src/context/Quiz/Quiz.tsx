import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { QuizContextProps, QuizInitialState } from "./quiz.types";
import { quizReducer } from "./quiz.reducer";

const quizContext = createContext<QuizContextProps | undefined>(undefined);

const quizInitialState: QuizInitialState = {
  quizNames: [],
  score: [],
  quizQuestions: [],
  userAnswers: {
    quizName: "",
    userSelectedOptions: [],
    score: 0,
  },
};

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizState, quizDispatch] = useReducer(quizReducer, quizInitialState);

  return (
    <quizContext.Provider value={{ quizState, quizDispatch }}>
      {children}
    </quizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(quizContext) as QuizContextProps;
}
