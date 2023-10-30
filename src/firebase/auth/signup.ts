import { firebaseAuth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const signup = async (name: string, email: string, password: string) => {
  let error: unknown = null;

  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password).then(async (userCredential) => {
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      console.log(userCredential);
    });
  } catch (e) {
    error = e;
  }

  return { error };
};

export { signup };
