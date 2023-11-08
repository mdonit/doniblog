"use client";
import { useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";
import { QuestionsSection } from "./QuestionsSection";
import { addToQuestions } from "@/firebase/questions";
import styles from "@/styles/qna.module.css";

const QnaPage = () => {
  const userLoggedIn = useGetUser().loggedIn;
  const userName = useGetUser().user?.displayName;
  const [userQuestion, setUserQuestion] = useState<string>("");

  const postQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userQuestion.split(" ").length);

    if (userQuestion.split(" ").length > 2) userName && addToQuestions(userName, userQuestion);
    else alert("You can't submit an empty prompt.\nType in a valid question, please!\n(3 words at least)");
  };

  return (
    <div>
      <h2>Ask any questions!</h2>
      <div className={styles["question-input"]}>
        {userLoggedIn ? (
          <form onSubmit={postQuestion}>
            <input type="text" name="question" id="question" placeholder="Type in a question!" onChange={(e) => setUserQuestion(e.target.value.trim())} style={{ padding: "5px" }} />
            <button type="submit">Submit</button>
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
