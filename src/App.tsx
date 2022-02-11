import React, { useEffect } from "react";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { ProfileUpdate } from "./pages/AccountSetting/components/ProfileUpdate";
import { QuizQuestions } from "./pages/QuizQuestions/QuizQuestions";
import { auth } from "./firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./context/Auth/auth";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { AccountSetting } from "./pages/AccountSetting/AccountSetting";
import { PasswordUpdate } from "./pages/AccountSetting/components/PasswordUpdate";
import { QuizResult } from "./pages/QuizQuestions/components/QuizResult/QuizResult";
import { DashBoard } from "./pages/DashBoard/DashBoard";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { LocationState } from "./pages/SignIn/types";
import { NoMatch } from "./components/NoMatch/NoMatch";

function App() {
  const {
    dispatch,
    state: { userData },
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState;
  const preLocation =
    state !== null && state.from.prevLocation ? state.from.prevLocation : "/";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        dispatch({
          type: "INITIALIZE_USER_DATA",
          payload: userData,
        });
        navigate(preLocation||location.pathname);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [userData, auth]);

  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/quiz/:quizName/:quizID"
          element={
            <PrivateRoute>
              <QuizQuestions />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:quizName/result"
          element={
            <PrivateRoute>
              <QuizResult />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <AccountSetting />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Navigate to="profile" />} />
          <Route path="profile" element={<ProfileUpdate />} />
          <Route path="password" element={<PasswordUpdate />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
