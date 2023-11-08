import { useCollection } from "react-firebase-hooks/firestore";
import CommentInput from "./CommentInput";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import { useGetUser } from "@/hooks/useGetUser";
import { addCommentToQuestion } from "@/firebase/questions";
import { collection, getFirestore } from "firebase/firestore";
import { app } from "@/firebase/config";
import { Fragment, useState } from "react";
import styles from "@/styles/qna.module.css";
import { BiUpArrow } from "react-icons/bi";

export const QuestionsSection = ({ userLoggedIn }: { userLoggedIn: boolean }) => {
  const [value, loading, error] = useCollection(collection(getFirestore(app), "questions"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [openComments, setOpenComments] = useState<{ visible: boolean; id: string }>({ visible: false, id: "" });
  const displayName = useGetUser().user?.displayName;

  const postComment = (e: React.FormEvent, comment: string[], questionId: string | undefined) => {
    e.preventDefault();

    if (displayName && questionId && comment) addCommentToQuestion(questionId, displayName, comment);
    else console.log("VMI NEM JÓ", { displayName, questionId, comment });
  };

  const showComments = (id: string) => {
    console.log(id);

    if (id === openComments.id) {
      setOpenComments((prev) => ({ visible: !prev.visible, id: id }));
      return;
    }

    setOpenComments({ visible: true, id: id });
  };

  return (
    <div className={styles["question-list"]}>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value &&
        value.docs.map((qu) => (
          <div key={qu.id} className={openComments.visible && openComments.id === qu.id ? styles["question-card--open"] : styles["question-card"]}>
            <div className={styles["question-card__header"]}>
              <div
                className={styles["question-card__title"]}
                onClick={() => {
                  showComments(qu.id);
                }}
              >
                <BiUpArrow size={25} className={styles["question-card__arrow-icon"]} />
                <h3>
                  <span className={styles["question-card__title-text"]}>Question: {qu.data().question}</span>
                </h3>
              </div>
              <h4>by {qu.data().displayName}</h4>
            </div>
            <div className={styles["question-card__body"]}>
              <div>
                <ul>
                  {qu.data().comments.map((co: UserComment) => (
                    <li key={co.id}>
                      <div className={styles["comment-box"]}>
                        <p className={styles["comment-box__user"]}>@{co.displayName}</p>
                        <p>
                          {co.comment.map((c, idx) => (
                            <Fragment key={`${c}${idx}`}>
                              {c}
                              {idx < co.comment.length - 1 && <br />}
                            </Fragment>
                          ))}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <CommentInput postComment={postComment} questionId={qu.id} userLoggedIn={userLoggedIn} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
