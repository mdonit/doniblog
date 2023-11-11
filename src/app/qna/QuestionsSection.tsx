import { useCollection } from "react-firebase-hooks/firestore";
import CommentInput from "./CommentInput";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import { useGetUser } from "@/hooks/useGetUser";
import { addCommentToQuestion } from "@/firebase/questions";
import { collection, getFirestore, orderBy } from "firebase/firestore";
import { app } from "@/firebase/config";
import { Fragment, useState } from "react";
import styles from "@/styles/qna.module.css";
import { BiUpArrow } from "react-icons/bi";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import moment from "moment";

export const QuestionsSection = ({ userLoggedIn }: { userLoggedIn: boolean }) => {
  const [value, loading, error] = useCollection(collection(getFirestore(app), "questions"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [openComments, setOpenComments] = useState<{ visible: boolean; id: string }>({ visible: false, id: "" });
  const displayName = useGetUser().user?.displayName;

  const postComment = (e: React.FormEvent, comment: string[], questionId: string | undefined) => {
    e.preventDefault();

    if (displayName && questionId && comment) addCommentToQuestion(questionId, displayName, comment);
    else console.log("POST ERROR", { displayName, questionId, comment });
  };

  const showComments = (id: string) => {
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
        value.docs
          .sort((a, b) => (a.data().postDate > b.data().postDate ? 1 : -1))
          .map((qu) => (
            <div key={qu.id} className={openComments.visible && openComments.id === qu.id ? styles["question-card--open"] : styles["question-card"]}>
              <div className={styles["question-card__header"]}>
                <div className={styles["question-card__title"]}>
                  <BiUpArrow size={25} className={styles["question-card__arrow-icon"]} />
                  <h3>
                    <span
                      className={styles["question-card__title-text"]}
                      onClick={() => {
                        showComments(qu.id);
                      }}
                    >
                      Question: {qu.data().question}
                    </span>
                  </h3>
                </div>
                <h4>
                  @{qu.data().displayName} <span style={{ marginLeft: "1rem", fontSize: "0.8rem" }}>{moment(qu.data().postDate).fromNow()}</span>
                </h4>
              </div>
              <div className={styles["question-card__body"]}>
                <div>
                  <ul>
                    {qu.data().comments.length > 9 && openComments.visible && openComments.id === qu.id && (
                      <li className={styles["question-card__nav-link"]} style={{ marginTop: "2rem" }}>
                        <span id="toTop">
                          <a href="#toBottom">
                            To latest comment <AiOutlineArrowDown />
                          </a>
                        </span>
                      </li>
                    )}
                    {qu.data().comments.length === 0 ? (
                      <li style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                        <p>No comments yet.</p>
                      </li>
                    ) : (
                      qu
                        .data()
                        .comments.sort((a: UserComment, b: UserComment) => (a.postDate > b.postDate ? 1 : -1))
                        .map((co: UserComment) => (
                          <li key={co.id}>
                            <div className={styles["comment-box"]}>
                              <p className={styles["comment-box__user"]}>
                                @{co.displayName} <span className={styles["comment-box__date"]}>{moment(co.postDate).fromNow()}</span>
                              </p>
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
                        ))
                    )}
                    {qu.data().comments.length > 9 && openComments.visible && openComments.id === qu.id && (
                      <li className={styles["question-card__nav-link"]}>
                        <span id="toBottom">
                          <a href="#toTop">
                            To first comment <AiOutlineArrowUp />
                          </a>
                        </span>
                      </li>
                    )}
                  </ul>
                  <CommentInput postComment={postComment} questionId={qu.id} userLoggedIn={userLoggedIn} />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};
