import { GetQuizName } from "../types/quizQues.types";

export function getQuizName({
  quizID,
  quizNameData,
}: GetQuizName): string | undefined {
  const name = quizNameData.find((quiz) => quiz.uid == quizID);
  return name?.quizName;
}
