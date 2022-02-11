import { UserQuizScore } from "../types/dashboard.types";
import { format } from "timeago.js";

export const columnHeader = ["S.No", "Quiz Name", "Score", "Play Time"];


export function getNewUserValueAfterFormatTime(
  userData: UserQuizScore
): UserQuizScore {
  let result;
  const getTimeStamp = userData.playTime.toDate().toString();
  result = {
    slNo: userData.slNo + 1,
    quizName: userData.quizName,
    score: userData.score,
    playTime: format(getTimeStamp),
  };
  return result;
}
