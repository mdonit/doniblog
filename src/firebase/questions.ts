import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { fireStoreDb } from "./config";
import { v4 } from "uuid";

const collectionPath = "questions";

export const addToQuestions = async (name: string, newQuestion: string) => {
  const dateNow: number = Date.now();

  const userQuestion: UserQuestion = {
    displayName: name,
    question: newQuestion,
    comments: [],
    postDate: dateNow,
  };

  await addDoc(collection(fireStoreDb, collectionPath), userQuestion);
};

export const addCommentToQuestion = async (questionId: string, name: string, newComment: string[]) => {
  const querySnapshot = await getDocs(collection(fireStoreDb, collectionPath));
  let existingId = "";
  let comments: UserComment[] = [];
  const dateNow: number = Date.now();

  querySnapshot.forEach((doc) => {
    if (doc.id === questionId) {
      existingId = doc.id;
      comments = doc.data().comments;
      return;
    }
  });

  comments.push({ id: v4(), displayName: name, comment: newComment, postDate: dateNow });

  const questionRef = doc(fireStoreDb, collectionPath, existingId);

  await updateDoc(questionRef, { comments: comments });
};

export const deleteFromQuestions = async (id: string) => {
  await deleteDoc(doc(fireStoreDb, collectionPath, id));
};

export const getFromQuestions = async () => {
  return await getDocs(collection(fireStoreDb, collectionPath));
};
