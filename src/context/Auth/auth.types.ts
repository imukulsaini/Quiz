import { Dispatch } from "react";
import { User as FirebaseUser } from "firebase/auth";

type UserScore = {
  quizID: string;
  score: number;
};
type UPDATEUSER = {
  displayName: string;
  email: string;
};
export type AuthAction =
  | { type: "INITIALIZE_USER_DATA"; payload: FirebaseUser | null }
  | { type: "LOGOUT" }
  | { type: "SET_USER_SCORE"; payload: UserScore[] }
  | { type: "UPDATE_USER_SCORE"; payload: UserScore }
  | { type: "UPDATE_USER_DATA"; payload: UPDATEUSER };

export type AuthInitialState = {
  userData: FirebaseUser | null;
  isUserLogin: boolean;
  status: string;
  userScore: UserScore[];
  // score:number
};
export type AuthContextProps = {
  state: AuthInitialState;
  dispatch: Dispatch<AuthAction>;
  // logout:()=>void
};
