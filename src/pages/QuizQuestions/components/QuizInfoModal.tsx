import React from "react";
import Modal from "react-modal";
import { QuizInfoModalProps } from "../types/quizQues.types";

export function QuizInfoModal({
  isInfoQuizModal,
  closeInfoModal,
}: QuizInfoModalProps) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "28.3rem",
      height: "21.5rem",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "#f9f4ef",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={isInfoQuizModal}
      onRequestClose={closeInfoModal}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
      contentLabel="Info Modal"
      ariaHideApp={false}
    >
      <div
        className="flex flex-col
        items-center gap-1 h-full overflow-y-hidden
        bg-background
        "
      >
        <div className=" flex flex-col self-end mr-5">
          <span>No of Questions = 10</span>
          <span>Duration - 5 Minutes</span>
        </div>
        {/* Rules */}
        <div>
          <span className="text-2xl font-semibold p-2">Rules : </span>
          <div>
            <ul className="flex flex-col gap-1 text-base list-disc mt-2">
              <li>
                <span> +2 Points For Correct Answers</span>
              </li>
              <li>
                <span> No Negative Points For Wrong Answers</span>
              </li>
              <li>
                <span>
                  There is no Negative Point for skiping the Question{" "}
                </span>
              </li>

              <li>
                <span> Time limit for each Question is 30 seconds </span>
              </li>
              <li>
                <span>Submit Quiz Before The Time expires</span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => closeInfoModal()}
              className="bg-highlight w-40 h-10 rounded-md"
            >
              Start The Quiz
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
