import { FirebaseError } from "@firebase/util";
export declare type FirestoreErrorCode =
  | "cancelled"
  | "unknown"
  | "invalid-argument"
  | "deadline-exceeded"
  | "not-found"
  | "already-exists"
  | "permission-denied"
  | "resource-exhausted"
  | "failed-precondition"
  | "aborted"
  | "out-of-range"
  | "unimplemented"
  | "internal"
  | "unavailable"
  | "data-loss"
  | "unauthenticated";

export function checkFirebaseError(error: FirebaseError) {

  if (error.code.startsWith("auth/")) {
    if (error.code && error.code === "auth/user-not-found") {
      return { errMessage: "Check Your Email And Password" };
    }
    if (error.code && error.code === "auth/wrong-password") {
      return { errMessage: "Your Password is Correct. Try Again" };
    }
    if (error.code && error.code === "auth/email-already-in-use") {
      return {
        errMessage:
          "User Already regsiter with this email . Try again With another Email.",
      };
    }
    if (error.code && error.code === "auth/invalid-credential") {
      return { errMessage: "unauthorized user" };
    }
    if (error.code && error.code === "auth/EMAIL_NOT_FOUND") {
      return { errMessage: "Check Your Email And Password" };
    }
    if (error.code && error.code === "auth/requires-recent-login") {
      return { errMessage: "loginAgain" };
    }
    if (error.code && error.code === "auth/weak-password") {
      return { errMessage: "your password is weak ,try Again" };
    }
    if (error.code && error.code === "auth/too-many-requests") {
      return {
        errMessage:
          "Your Account is temporarily disable because of too many failed login attempts .Try Again After Some Time",
      };
    }
  }
  console.log(error.code);
  if (error.code === "not-found") {
    return { errMessage: "Quiz Questions Not Found" };
  }
  console.log(error);
  return { errMessage: "Network Error Try Again" };
}
