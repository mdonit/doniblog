"use client";
import Image from "next/image";
import styles from "@/styles/home.module.css";

const Home = () => {
  return (
    <section>
      <div className={styles.home}>
        <Image priority src="/den.jpg" alt="me" width="200" height="200" className={styles["profile-img"]} draggable="false" onContextMenu={(e) => e.preventDefault()} />
        <h1>Donát Maráki</h1>
        <div>
          <p className={styles.profession}>Webdesigner, Programmer, Illustrator, Graphic Artist</p>
          <p>This is my personal website, made with Next.js; features:</p>
          <ul>
            <li>- Next.js App routing</li>
            <li>- Firebase storage for Q&A</li>
            <li>- Firebase authentication; custom display name</li>
            <li>- Static blog posts with markdown and gray-matter</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
