import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/Auth/auth";
import { getUserScore } from "../../firebase/firebase.config";
import { LoadingSpinner } from "../../components/Spinner/LoadingSpinner";
import {
  columnHeader,
  getNewUserValueAfterFormatTime,
  sortUserScore,
} from "./utils/dashboard.utils";
import { UserQuizScore } from "./types/dashboard.types";

export function DashBoard() {
  const {
    state: { userData },
  } = useAuth();

  const [loading, setLoading] = useState<string>("idle");
  const [userScore, setScore] = useState<UserQuizScore[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      setLoading("pending");
      if (userData) {
        const response = await getUserScore(userData.uid);
        if ("errMessage" in response) {
          setLoading("rejected");
          setError(response.errMessage);
        } else {
          setScore(response);
          setLoading("fulfilled");
        }
      }
    })();
  }, [userData]);

  const sortedScore = userScore && sortUserScore(userScore);

  return (
    <div className="w-full h-screen bg-primary">
      <Navbar />
      <section className="flex flex-col items-center w-full ">
        {loading === "pending" && (
          <span className="w-1 ml-2">
            <LoadingSpinner color="##260601" isDefaultCss={true} size={23} />
          </span>
        )}
        {loading === "fulfilled" && (
          <table
            className="w-10/12 border-separate border-collapse border border-slate-400"
            cellSpacing="0"
          >
            <thead className="bg-secondary h-12">
              <tr className="">
                {columnHeader &&
                  columnHeader.map((col, index) => {
                    return (
                      <th className="border border-slate-300" key={index}>
                        {col.toUpperCase()}
                      </th>
                    );
                  })}
              </tr>
            </thead>

            <tbody className="">
              {sortedScore &&
                loading === "fulfilled" &&
                Object.values(sortedScore).map((userValue, index) => {
                  const newValue = getNewUserValueAfterFormatTime(userValue);
                  return (
                    <tr key={index} className="">
                      {Object.values(newValue).map((value, index2) => {
                        return (
                          <td
                            className="p-2 border border-slate-300"
                            key={index2}
                          >
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
