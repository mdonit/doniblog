const placeHolderQuestions: UserQuestion[] = [
  { id: "1", displayName: "user-01", question: "1. Kérdés?", comments: [{ id: "1-1", displayName: "user-x", comment: ["Nice comment 01!"] }] },
  {
    id: "2",
    displayName: "user-02",
    question: "2. Kérdés?",
    comments: [
      { id: "2-1", displayName: "user-x", comment: ["Nice comment 01!"] },
      { id: "2-2", displayName: "user-y", comment: ["Nice comment 02!"] },
    ],
  },
];

export const UserQuestions = () => {
  return (
    <div>
      {placeHolderQuestions.map((qu) => (
        <div key={qu.id}>
          <br />
          <h3>Question: {qu.question}</h3>
          <h4>by {qu.displayName}</h4>
          <ul>
            {qu.comments.map((co) => (
              <li key={co.id}>
                Name: {co.displayName} | Comment:{co.comment}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
