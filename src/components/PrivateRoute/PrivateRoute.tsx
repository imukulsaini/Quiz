import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth/auth";
export function PrivateRoute({ children }: { children: JSX.Element }) {
  const {
    state: { isUserLogin },
  } = useAuth();

  let location = useLocation();
   console.log(location.pathname)
  return isUserLogin ? (
    children
  ) : (
    <Navigate
      state={{
        from: {
          prevLocation: location.pathname,
        },
      }}
      replace
      to="/login"
    />
  );
}
