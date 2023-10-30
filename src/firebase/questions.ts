import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { fireStoreDb } from "./config";

const collectionPath = "questions";

export const addToQuestions = async (name: string, newQuestion: string) => {
  const userQuestion: UserQuestion = {
    displayName: name,
    question: newQuestion,
    comments: [],
  };

  await addDoc(collection(fireStoreDb, collectionPath), userQuestion);
};

export const addCommentToQuestion = async (questionId: string, name: string, newComment: string[]) => {
  const querySnapshot = await getDocs(collection(fireStoreDb, collectionPath));
  let existingId = "";

  querySnapshot.forEach((doc) => {
    if (doc.id === questionId) {
      existingId === doc.id;
      return;
    }
  });

  const uploadComment: UserComment = { displayName: name, comment: newComment };

  const questionRef = doc(fireStoreDb, collectionPath, existingId);
  await updateDoc(questionRef, { comments: [{ ...uploadComment }] });
};

export const deleteFromQuestions = async (id: string) => {
  await deleteDoc(doc(fireStoreDb, collectionPath, id));
};

export const getFromQuestions = async () => {
  return await getDocs(collection(fireStoreDb, collectionPath));
};
