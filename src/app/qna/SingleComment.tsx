import { useState } from "react";

type CommentProps = {
  postComment: (e: React.FormEvent, comment: string[], id: string | undefined) => void;
  questionId: string | undefined;
  userLoggedIn: boolean;
};

const SingleComment = ({ postComment, questionId, userLoggedIn }: CommentProps) => {
  const [comment, setComment] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    postComment(e, comment, questionId);
    setComment([""]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {userLoggedIn ? (
        <>
          <textarea
            name="comment"
            cols={40}
            rows={3}
            placeholder="Leave a comment..."
            onChange={(e) => {
              setComment(e.target.value.trim().split("\n"));
            }}
            value={comment}
          />
          <button type="submit">Submit</button>
        </>
      ) : (
        <textarea name="comment" cols={40} rows={3} placeholder="Sign in to leave a comment..." disabled />
      )}
    </form>
  );
};

export default SingleComment;
