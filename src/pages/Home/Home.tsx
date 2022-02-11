import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";
import { useQuiz } from "../../context/Quiz/Quiz";
import { getQuizNames } from "../../firebase/firebase.config";

export function Home() {
  const {
    quizState: { quizNames },
    quizDispatch,
  } = useQuiz();

  const [loading, setLoading] = useState<string>("idle");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading("pending");
    let isCall = false;

    const getQuiz = async function getQuiz() {
      const response = await getQuizNames();
      if (!isCall) {
        if ("errMessage" in response) {
          setLoading("rejected");
          setError(response.errMessage);
        } else {
          setLoading("fulfilled");
          quizDispatch({ type: "GET_QUIZ_NAME", payload: response });
        }
      }
    };
    getQuiz();
    return () => {
      isCall = true;
    };
  }, []);

  return (
    <>
      <div className=" w-full h-screen ">
        <Navbar />
        <section className="w-full h-full bg-primary">
          {loading === "pending" && (
            <span className="w-1 ml-2">
              <LoadingSpinner color="##260601" isDefaultCss={true} size={23} />
            </span>
          )}

          <div className="grid grid-flow-row grid-col-3 grid-row-3 gap-3 p-6 bg-primary wrap ">
            {loading === "fulfilled" &&
              quizNames &&
              quizNames.map((name, index) => {
                const urlName = name.quizName
                  .replaceAll(" ", "-")
                  .toLocaleLowerCase();
                return (
                  <div
                    key={name.uid}
                    onClick={() => navigate(`/quiz/${urlName}/${name.uid}`)}
                    className={
                      index === 1
                        ? "col-end-3 row-end-3 cursor-pointer "
                        : "cursor-pointer rounded-t-sm"
                    }
                  >
                    <img
                      className="rounded-t-lg"
                      src={name.imageUrl}
                      alt={name.quizName}
                    />
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
}
