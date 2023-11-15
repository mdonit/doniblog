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
import { BiUpArrow } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

const Navigation = () => {
  const [modalAuthVisible, setModalAuthVisible] = useState<boolean>(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [openMobileLinks, setOpenMobileLinks] = useState<boolean>(false);
  const [openMobileAuth, setOpenMobileAuth] = useState<boolean>(false);

  const toggleAuthModal = (login?: boolean) => {
    login ? setIsLogin(true) : setIsLogin(false);
    setModalAuthVisible((prev) => !prev);

    if (openMobileAuth) setOpenMobileAuth(false);
  };
  const toggleConfirmModal = () => {
    setModalConfirmVisible((prev) => !prev);
  };

  const userSignOut = () => {
    signout();
    setModalConfirmVisible(false);
    if (openMobileAuth) setOpenMobileAuth(false);
  };

  const pathname = usePathname();

  const mobileNavHandler = (isLinks: boolean) => {
    if (isLinks) {
      setOpenMobileLinks((prev) => !prev);
      setOpenMobileAuth(false);
    } else {
      setOpenMobileAuth((prev) => !prev);
      setOpenMobileLinks(false);
    }
  };

  return (
    <>
      {modalAuthVisible && <AuthModal toggleModal={toggleAuthModal} isLogin={isLogin} />}
      {modalConfirmVisible && <ConfirmModal text={"sign out"} func={userSignOut} toggleConfirmModal={toggleConfirmModal} />}
      <nav className={styles.nav}>
        <div>
          <Image priority src="/den.jpg" alt="me" width="50" height="50" className={styles["nav-icon"]} draggable="false" onContextMenu={(e) => e.preventDefault()} />
        </div>
        <div className={`${styles["nav--mobile"]} ${openMobileLinks && styles["nav--mobile--open"]}`}>
          <BiUpArrow size={45} className={styles["nav--mobile__icon"]} onClick={() => mobileNavHandler(true)} />
        </div>
        <div className={`${styles["nav--mobile"]} ${openMobileAuth && styles["nav--mobile--open"]}`}>
          <GiHamburgerMenu size={45} className={styles["nav--mobile__icon"]} onClick={() => mobileNavHandler(false)} />
        </div>
        <div className={`${styles["nav--mobile__links"]} ${openMobileLinks && styles["nav--mobile--window-open"]}`}>
          <ul>
            <li className={`link ${pathname === "/" ? styles["nav-link--active"] : ""}`}>
              <Link
                href="/"
                onClick={() => {
                  openMobileLinks && mobileNavHandler(true);
                }}
              >
                Home
              </Link>
            </li>
            <li className={`link ${pathname.startsWith("/portfolio-categories") ? styles["nav-link--active"] : ""}`}>
              <Link
                href="/portfolio-categories"
                onClick={() => {
                  openMobileLinks && mobileNavHandler(true);
                }}
              >
                Portfolio
              </Link>
            </li>
            <li className={`link ${pathname.startsWith("/blog") ? styles["nav-link--active"] : ""}`}>
              <Link
                href="/blog"
                onClick={() => {
                  openMobileLinks && mobileNavHandler(true);
                }}
              >
                Blog
              </Link>
            </li>
            <li className={`link ${pathname.startsWith("/qna") ? styles["nav-link--active"] : ""}`}>
              <Link
                href="/qna"
                onClick={() => {
                  openMobileLinks && mobileNavHandler(true);
                }}
              >
                Q&A
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles["nav--mobile__auth"]} ${openMobileAuth && styles["nav--mobile--window-open"]}`}>
          <div className={styles["auth-buttons"]}>
            <AuthOptions toggleAuthModal={toggleAuthModal} toggleConfirmModal={toggleConfirmModal} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
