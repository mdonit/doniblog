import { useCollection } from "react-firebase-hooks/firestore";
import SingleComment from "./SingleComment";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import { useGetUser } from "@/hooks/useGetUser";
import { addCommentToQuestion } from "@/firebase/questions";
import { collection, getFirestore } from "firebase/firestore";
import { app } from "@/firebase/config";
import { Fragment } from "react";
import styles from "@/styles/comments.module.css";

export const QuestionsSection = ({ userLoggedIn }: { userLoggedIn: boolean }) => {
  const [value, loading, error] = useCollection(collection(getFirestore(app), "questions"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const questions: UserQuestion[] = useGetQuestions();
  const displayName = useGetUser().user?.displayName;

  const postComment = (e: React.FormEvent, comment: string[], questionId: string | undefined) => {
    e.preventDefault();

    if (displayName && questionId && comment) addCommentToQuestion(questionId, displayName, comment);
    else console.log("VMI NEM JÓ", { displayName, questionId, comment });
  };

  return (
    <div className={styles.questionList}>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value &&
        value.docs.map((qu) => (
          <div key={qu.id} className={styles.questionCard}>
            <h3>Question: {qu.data().question}</h3>
            <h4>by {qu.data().displayName}</h4>
            <ul>
              {qu.data().comments.map((co: UserComment) => (
                <li key={co.id}>
                  <div className={styles.comment}>
                    <p>
                      {co.comment.map((c, idx) => (
                        <Fragment key={`${c}${idx}`}>
                          {c}
                          {idx < co.comment.length - 1 && <br />}
                        </Fragment>
                      ))}
                    </p>
                    <p style={{ fontSize: "13px", textAlign: "right" }}>by {co.displayName}</p>
                  </div>
                </li>
              ))}
            </ul>
            <SingleComment postComment={postComment} questionId={qu.id} userLoggedIn={userLoggedIn} />
          </div>
        ))}
    </div>
  );
};
