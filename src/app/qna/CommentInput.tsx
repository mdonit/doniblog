import { useState } from "react";
import styles from "@/styles/qna.module.css";

type CommentProps = {
  postComment: (e: React.FormEvent, comment: string[], id: string | undefined) => void;
  questionId: string | undefined;
  userLoggedIn: boolean;
};

const CommentInput = ({ postComment, questionId, userLoggedIn }: CommentProps) => {
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatedComment: string[] = comment.trim().split("\n");

    formatedComment[0] !== "" && postComment(e, formatedComment, questionId);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles["comment-input"]}>
      {userLoggedIn ? (
        <>
          <textarea name="comment" cols={33} rows={3} placeholder="Leave a comment..." onChange={(e) => setComment(e.target.value)} value={comment} />
          <button type="submit">Comment</button>
        </>
      ) : (
        <textarea name="comment" cols={33} rows={3} placeholder="Sign in to leave a comment..." disabled />
      )}
    </form>
  );
};

export default CommentInput;
