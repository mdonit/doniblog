"use client";
import { useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";
import { QuestionsSection } from "./QuestionsSection";
import { addToQuestions } from "@/firebase/questions";

const QnaPage = () => {
  const userLoggedIn = useGetUser().loggedIn;
  const userName = useGetUser().user?.displayName;
  const [userQuestion, setUserQuestion] = useState<string>("");

  const leaveComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userQuestion);

    userName && addToQuestions(userName, userQuestion);
  };

  return (
    <>
      <div>
        <h2>Q&A Page</h2>
        <br />
        <div>
          <p>Enter Question: </p>
          {userLoggedIn ? (
            <form onSubmit={leaveComment}>
              <input type="text" name="question" id="question" placeholder="Type in a question!" onChange={(e) => setUserQuestion(e.target.value.trim())} />
              <button type="submit">Submit</button>
            </form>
          ) : (
            <input type="text" name="question" id="question" placeholder="Sign in to type a question!" disabled />
          )}
        </div>
        <br />
        <QuestionsSection userLoggedIn={userLoggedIn} />
      </div>
    </>
  );
};

export default QnaPage;
