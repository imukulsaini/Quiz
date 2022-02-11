import { AuthInitialState, AuthAction } from "./auth.types";

export function authReducer(state: AuthInitialState, action: AuthAction) {
  switch (action.type) {
    case "INITIALIZE_USER_DATA": {
      return {
        ...state,
        userData: action.payload,
        isUserLogin: true,
        status: "fulfilled",
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isUserLogin: false,
        userData: null,
        status: "idle",
      };
    }

    case "SET_USER_SCORE": {
      return {
        ...state,
        userScore: action.payload,
      };
    }
    case "UPDATE_USER_DATA": {
      return {
        ...state,
        userData:
          state.userData !== null
            ? {
                ...state.userData,
                displayName: action.payload.displayName,
                email: action.payload.email,
              }
            : null,

      };
    }
    case "UPDATE_USER_SCORE": {
      return {
        ...state,
        userScore: state.userScore.map((us) =>
          us.quizID === action.payload.quizID
            ? { ...us, score: action.payload.score }
            : us
        ),
      };
    }

    default:
      return state;
  }
}
