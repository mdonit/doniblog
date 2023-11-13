"use client";
import AuthOptions from "@/components/AuthOptions";
import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { signout } from "@/firebase/auth/signout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import styles from "@/styles/nav.module.css";
import Image from "next/image";

const Navigation = () => {
  const [modalAuthVisible, setModalAuthVisible] = useState<boolean>(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const toggleAuthModal = (login?: boolean) => {
    login ? setIsLogin(true) : setIsLogin(false);
    setModalAuthVisible((prev) => !prev);
  };
  const toggleConfirmModal = () => {
    setModalConfirmVisible((prev) => !prev);
  };

  const userSignOut = () => {
    signout();
    setModalConfirmVisible(false);
  };

  const pathname = usePathname();

  return (
    <>
      {modalAuthVisible && <AuthModal toggleModal={toggleAuthModal} isLogin={isLogin} />}
      {modalConfirmVisible && <ConfirmModal text={"sign out"} func={userSignOut} toggleConfirmModal={toggleConfirmModal} />}
      <nav className={styles.nav}>
        <div>
          <Image priority src="/den.jpg" alt="me" width="50" height="50" className={styles["nav-icon"]} draggable="false" onContextMenu={(e) => e.preventDefault()} />
        </div>
        <ul>
          <li className={`link ${pathname === "/" ? styles["nav-link--active"] : ""}`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`link ${pathname.startsWith("/portfolio-categories") ? styles["nav-link--active"] : ""}`}>
            <Link href="/portfolio-categories">Portfolio</Link>
          </li>
          <li className={`link ${pathname.startsWith("/blog") ? styles["nav-link--active"] : ""}`}>
            <Link href="/blog">Blog</Link>
          </li>
          <li className={`link ${pathname.startsWith("/qna") ? styles["nav-link--active"] : ""}`}>
            <Link href="/qna">Q&A</Link>
          </li>
        </ul>
        <div className={styles["auth-buttons"]}>
          <AuthOptions toggleAuthModal={toggleAuthModal} toggleConfirmModal={toggleConfirmModal} />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
