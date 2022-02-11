import { GetRightAnswer } from "../types/quizresult.types";

export function getRightAnswer(quizOptions: GetRightAnswer[]) {
  return quizOptions.filter(
    (option: GetRightAnswer) => option.isRight === true
  );
}