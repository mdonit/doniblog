type BlogPost = {
  id: string;
  title: string;
  date: string;
};

type UserComment = {
  id?: string;
  displayName: string;
  comment: string[];
  postDate: number;
};

type UserQuestion = {
  id?: string;
  displayName: string;
  question: string;
  comments: UserComment[];
  postDate: number;
};

type UserName = {
  id: string;
  displayName: string;
};
