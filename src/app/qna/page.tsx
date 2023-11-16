"use client";
import { useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";
import { QuestionsSection } from "./QuestionsSection";
import { addToQuestions } from "@/firebase/questions";
import styles from "@/styles/qna.module.css";
import styles2 from "@/styles/modal.module.css";

const QnaPage = () => {
  const userLoggedIn = useGetUser().loggedIn;
  const userName = useGetUser().user?.displayName;
  const [userQuestion, setUserQuestion] = useState<string>("");
  const [questionInvalid, setQuestionInvalid] = useState<boolean>(false);

  const postQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(userQuestion.split(" ").length);

    if (userQuestion.split(" ").length > 2) userName && addToQuestions(userName, userQuestion);
    else setQuestionInvalid(true);
  };

  return (
    <div>
      <h2 className="page-title">Ask any questions!</h2>
      <div className={styles["question-input"]}>
        {userLoggedIn ? (
          <form onSubmit={postQuestion}>
            <input
              className={questionInvalid ? styles2["form--invalid"] : ""}
              type="text"
              name="question"
              id="question"
              placeholder="Type in a question!"
              onChange={(e) => {
                setUserQuestion(e.target.value.trim());
                setQuestionInvalid(false);
              }}
              style={{ padding: "5px" }}
            />
            <button type="submit">Submit</button>
            {questionInvalid && (
              <p className={styles2["error-msg"]} style={{ top: "3rem", left: "10rem", fontSize: "1.2rem" }}>
                3 words at least!
              </p>
            )}
          </form>
        ) : (
          <>
            <input type="text" name="question" id="question" placeholder="Sign in to type a question!" style={{ padding: "5px" }} disabled />
            <button disabled>Submit</button>
          </>
        )}
      </div>
      <QuestionsSection userLoggedIn={userLoggedIn} />
    </div>
  );
};

export default QnaPage;
