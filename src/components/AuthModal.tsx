"use client";
// import { FirebaseAuthUI } from "./firebase-auth-ui";
import { signin } from "@/firebase/auth/signin";
import { signup } from "@/firebase/auth/signup";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "@/styles/auth.module.css";

type ToggleModal = {
  toggleModal: () => void;
  isLogin: boolean;
};

const AuthModal = ({ toggleModal, isLogin }: ToggleModal) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const currentPath = usePathname();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      const { error } = await signin(email, password);

      if (error) {
        console.log(error, "ROSSZ BEJELENTKEZÉS");

        return;
      }
    } else {
      const { error } = await signup(name, email, password);

      if (error) {
        console.log(error);
        return;
      }
    }

    router.push(currentPath);

    toggleModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.form}>
        <h3>{isLogin ? "LogIn" : "Sign Up"}</h3>
        {/* <FirebaseAuthUI /> */}
        <form onSubmit={handleForm}>
          {!isLogin && (
            <label htmlFor="name">
              <span>Display Name </span>
              <input onChange={(e) => setName(e.target.value.trim())} type="text" name="name" id="name" placeholder="Example Name" required />
            </label>
          )}
          <label htmlFor="email">
            <span>Email </span>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="example@gmail.com" required />
          </label>
          <label htmlFor="password">
            <span>Password </span>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="password" required />
          </label>
          <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
          <br />
        </form>
        <button onClick={toggleModal}>Cancel</button>
      </div>
    </div>
  );
};

export default AuthModal;
