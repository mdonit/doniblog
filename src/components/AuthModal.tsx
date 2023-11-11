"use client";
import { signin } from "@/firebase/auth/signin";
import { signup } from "@/firebase/auth/signup";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "@/styles/modal.module.css";

type ToggleModal = {
  toggleModal: () => void;
  isLogin: boolean;
};

const nameReg = /^[A-Z]([A-Z]|[a-z]|[0-9])+_([A-Z]|[a-z]|[0-9])+$/;

const AuthModal = ({ toggleModal, isLogin }: ToggleModal) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const router = useRouter();
  const currentPath = usePathname();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      const { error } = await signin(email, password);

      if (error) {
        console.log(error, "Login Failed.");

        return;
      }
    } else {
      if (!name.match(nameReg)) {
        setNameInvalid(true);
        return;
      }

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
      <div className={`${styles.form} ${styles["form--auth"]}`}>
        <h3>{isLogin ? "Login" : "Sign Up"}</h3>
        <form onSubmit={handleForm}>
          {!isLogin && (
            <label htmlFor="name">
              <span>Display Name </span>
              <input
                className={nameInvalid ? styles["form--invalid"] : ""}
                onChange={(e) => {
                  setName(e.target.value.trim());
                  setNameInvalid(false);
                }}
                type="text"
                name="name"
                id="name"
                placeholder="Example_Name09"
                required
              />
              {nameInvalid && <p className={styles["error-msg"]}>Please start with a Capital and include an underscore; no whitespace allowed</p>}
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
          <div className={`${styles["form__buttons"]} ${styles["form__buttons--auth"]}`}>
            <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
            <button onClick={toggleModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
