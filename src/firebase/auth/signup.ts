import { firebaseAuth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const signup = async (email: string, password: string) => {
  let error: unknown = null;

  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
      console.log(userCredential);
    });
  } catch (e) {
    error = e;
  }

  return { error };
};

export { signup };
