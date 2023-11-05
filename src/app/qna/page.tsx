"use client";
import { useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";
import { QuestionsSection } from "./QuestionsSection";
import { addToQuestions } from "@/firebase/questions";
import styles from "@/styles/comments.module.css";

const QnaPage = () => {
  const userLoggedIn = useGetUser().loggedIn;
  const userName = useGetUser().user?.displayName;
  const [userQuestion, setUserQuestion] = useState<string>("");

  const postQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    userName && addToQuestions(userName, userQuestion);
  };

  return (
    <div>
      <h2>Ask any questions!</h2>
      <div className={styles.questionInputHolder}>
        {userLoggedIn ? (
          <form onSubmit={postQuestion} className={styles.questionInputHolder}>
            <input type="text" name="question" id="question" placeholder="Type in a question!" onChange={(e) => setUserQuestion(e.target.value.trim())} style={{ padding: "5px" }} />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <input type="text" name="question" id="question" placeholder="Sign in to type a question!" style={{ padding: "5px" }} disabled />
        )}
      </div>
      <QuestionsSection userLoggedIn={userLoggedIn} />
    </div>
  );
};

export default QnaPage;
