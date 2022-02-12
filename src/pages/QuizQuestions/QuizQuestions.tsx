import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/Auth/auth";
import { useQuiz } from "../../context/Quiz/Quiz";
import { getQuizQuestions } from "../../firebase/firebase.config";
import { QuizInfoModal } from "./components/QuizInfoModal";
import { QuizQuestionsShow } from "./components/QuizQuestionsShow";

export function QuizQuestions() {
  const [isInfoQuizModal, setInfoQuiz] = useState<boolean>(true);
  const [loading, setLoading] = useState<string>("idle");
  const [error, setError] = useState<string>("");
  const  {state:{userData}}  =  useAuth()
  const { quizDispatch } = useQuiz();
  useEffect(() => {
    setInfoQuiz(true);
  }, []);
  const { quizID } = useParams();

  function closeInfoModal() {
    setInfoQuiz(false);
  }

  useEffect(() => {
    setLoading("pending");
    if (quizID) {
      (async function () {
        const response = await getQuizQuestions(quizID);
        if ("errMessage" in response) {
          setLoading("rejected");
          setError(response.errMessage);
        } else {
          quizDispatch({ type: "SET_QUIZ_QUESTIONS", payload: response });
          setLoading("fulfilled");
        }
      })();
    }
  }, [quizID,userData]);

  return (
    <div className="h-screen w-full bg-primary">
      <Navbar />
      {loading === "fulfilled" && (
        <>
          <QuizInfoModal
            isInfoQuizModal={isInfoQuizModal}
            closeInfoModal={closeInfoModal}
          />
          <section className="w-full  flex justify-center h-full bg-primary ">
            <QuizQuestionsShow isModalInfo={isInfoQuizModal} />
          </section>
        </>
      )}
    </div>
  );
}
