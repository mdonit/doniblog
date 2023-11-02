import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import SingleComment from "./SingleComment";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import { useGetUser } from "@/hooks/useGetUser";
import { addCommentToQuestion } from "@/firebase/questions";
import { collection, getFirestore } from "firebase/firestore";
import { app } from "@/firebase/config";

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
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value &&
        value.docs.map((qu) => (
          <div key={qu.id}>
            <br />
            <h3>Question: {qu.data().question}</h3>
            <h4>by {qu.data().displayName}</h4>
            <ul>
              {qu.data().comments.map((co: UserComment) => (
                <li key={co.id}>
                  <p>Comment:{co.comment}</p>
                  <p style={{ fontSize: "13px" }}>by: {co.displayName}</p>
                </li>
              ))}
            </ul>
            <SingleComment postComment={postComment} questionId={qu.id} userLoggedIn={userLoggedIn} />
          </div>
        ))}
    </div>
  );
};
