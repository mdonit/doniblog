import { firebaseAuth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const signin = async (email: string, password: string) => {
  let error: unknown = null;

  try {
    await signInWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
      console.log(userCredential);
    });
  } catch (e) {
    error = e;
  }

  return { error };
};

export { signin };
