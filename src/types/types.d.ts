type BlogPost = {
  id: string;
  title: string;
  date: string;
};

type UserComment = {
  id?: string;
  displayName: string;
  comment: string[];
};

type UserQuestion = {
  id?: string;
  displayName: string;
  question: string;
  comments: UserComment[];
};
