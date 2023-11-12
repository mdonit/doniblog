import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { fireStoreDb } from "./config";

const collectionPath = "displaynames";

export const addToNames = async (displayName: string, id: string) => {
  const userName: UserName = {
    id,
    displayName,
  };

  await addDoc(collection(fireStoreDb, collectionPath), userName);
};

export const deleteFromNames = async (id: string) => {
  await deleteDoc(doc(fireStoreDb, collectionPath, id));
};

export const getFromNames = async () => {
  return await getDocs(collection(fireStoreDb, collectionPath));
};
