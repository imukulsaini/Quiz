import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { authReducer } from "./auth.reducer";
import { AuthContextProps } from "./auth.types";

const authContext = createContext<AuthContextProps | undefined>(undefined);

const initialState = {
  userData: null,
  isUserLogin: false,
  status: "idle",
  userScore: [],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext) as AuthContextProps;
}
