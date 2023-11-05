import { useState } from "react";
import styles from "@/styles/comments.module.css";

type CommentProps = {
  postComment: (e: React.FormEvent, comment: string[], id: string | undefined) => void;
  questionId: string | undefined;
  userLoggedIn: boolean;
};

const SingleComment = ({ postComment, questionId, userLoggedIn }: CommentProps) => {
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    const formatedComment: string[] = comment.trim().split("\n");

    postComment(e, formatedComment, questionId);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentInputHolder}>
      {userLoggedIn ? (
        <>
          <textarea name="comment" cols={33} rows={3} placeholder="Leave a comment..." onChange={(e) => setComment(e.target.value)} value={comment} />
          <button type="submit">Submit</button>
        </>
      ) : (
        <textarea name="comment" cols={33} rows={3} placeholder="Sign in to leave a comment..." disabled />
      )}
    </form>
  );
};

export default SingleComment;
