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
          <p>This is my personal website, made with Next.js; features:</p>
          <ul>
            <li>- Next.js App routing</li>
            <li>- Firebase storage and authentication</li>
            <li>- Blog posts with markdown and gray-matter</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
