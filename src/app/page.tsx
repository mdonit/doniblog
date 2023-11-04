"use client";
import Image from "next/image";
import styles from "@/styles/home.module.css";

const Home = () => {
  return (
    <section>
      <div className={styles.home}>
        <Image priority src="/den.jpg" alt="me" width="200" height="200" className={styles.pfp} draggable="false" onContextMenu={(e) => e.preventDefault()} />
        <h1>Donát Maráki</h1>
        <div>
          <p className={styles.pos}>Webdesigner, Programmer, Illustrator, Graphic Artist</p>
          <p>
            This is my personal website, made with Next.js. It features Firebase integration with sign up/sign in functions as well as storage of questions and comments found in the Blog section of
            the page. Navigation is done with Next.js's App router.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
