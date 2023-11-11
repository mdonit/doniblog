import { useState, useEffect } from "react";
import { getFromQuestions } from "@/firebase/questions";

export const useGetQuestions = () => {
  const [questions, setQuestions] = useState<UserQuestion[]>([]);

  useEffect(() => {
    const helper = async () => {
      const initQuestions = await getFromQuestions();

      const questionsReceived: UserQuestion[] = [];

      initQuestions.forEach((doc) => {
        questionsReceived.push({ id: doc.id, displayName: doc.data().displayName, question: doc.data().question, comments: doc.data().comments, postDate: doc.data().postDate });
      });

      setQuestions(questionsReceived);
    };
    helper();
  }, []);

  return questions;
};
