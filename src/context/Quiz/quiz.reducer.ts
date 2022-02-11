import { QuizActions, QuizInitialState } from "./quiz.types";

export function quizReducer(state: QuizInitialState, action: QuizActions) {
  switch (action.type) {
    case "GET_QUIZ_NAME": {
      return {
        ...state,
        quizNames: action.payload,
      };
    }
    case "SET_QUIZ_QUESTIONS": {
      return {
        ...state,
        quizQuestions: action.payload,
      };
    }
    case "USER_SELECTED_ANSWER": {
      return {
        ...state,
        userAnswers: action.payload,
      };
    }
    default:
      return state;
  }
}
