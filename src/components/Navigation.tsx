"use client";
import AuthOptions from "@/components/AuthOptions";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import styles from "@/styles/nav.module.css";

const Navigation = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const toggleModal = (login?: boolean) => {
    login ? setIsLogin(true) : setIsLogin(false);
    setModalVisible((prev) => !prev);
  };

  const pathname = usePathname();

  return (
    <>
      {modalVisible && <AuthModal toggleModal={toggleModal} isLogin={isLogin} />}
      <nav className={styles.nav}>
        <div>Logo</div>
        <ul>
          <li className={`link ${pathname === "/" ? styles.active : ""}`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`link ${pathname.startsWith("/portfolio-categories") ? styles.active : ""}`}>
            <Link href="/portfolio-categories">Portfolio</Link>
          </li>
          <li className={`link ${pathname.startsWith("/blog") ? styles.active : ""}`}>
            <Link href="/blog">Blog</Link>
          </li>
          <li className={`link ${pathname.startsWith("/qna") ? styles.active : ""}`}>
            <Link href="/qna">Q&A</Link>
          </li>
        </ul>
        <div>
          <AuthOptions toggleModal={toggleModal} />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
