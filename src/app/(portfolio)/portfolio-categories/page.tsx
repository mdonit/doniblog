"use client";
import React from "react";
import styles from "@/styles/portfolio.module.css";
import Image from "next/image";

type PortfolioInfo = {
  id: string;
  imgSrc?: string;
  title: string;
  description: string;
  directLink?: string;
  githubLink?: string;
  technologies: string[];
};

const portfolioInfo: PortfolioInfo[] = [
  {
    id: "0",
    imgSrc: "/portfolio_0.jpg",
    title: "Comic Webpage",
    description: "Website design idea for a non-existent comic",
    directLink: "https://comic-donid.netlify.app/",
    technologies: ["HTML", "CSS", "JS"],
  },
  {
    id: "1",
    imgSrc: "/portfolio_1.jpg",
    title: "Quiz Webpage",
    description: "Simple quiz website where we can create our own questions and answers; features a scoreboard as well.",
    directLink: "https://donid-quiz.netlify.app/",
    githubLink: "https://github.com/mdonit/doni-quiz-app",
    technologies: ["React", "TypeScript", "Vite.js", "Firebase"],
  },
  {
    id: "2",
    title: "Barber Webpage",
    description: "Website idea for making an appointment at the barber's; appointments can be deleted as well.",
    githubLink: "https://github.com/mdonit/barbers",
    technologies: ["Node.js", "MongoDB"],
  },
];

const PortfolioPage = () => {
  return (
    <div>
      <h2>Webdev Works</h2>
      <div className={styles["card-list"]}>
        {portfolioInfo.map((po) => (
          <div key={po.id} className={styles.card}>
            {po.imgSrc ? (
              <Image priority src={po.imgSrc} alt={`${po.title} image`} width={264} height={159} draggable="false" onContextMenu={(e) => e.preventDefault()} />
            ) : (
              <Image priority src="/Noimage.jpg" alt={`${po.title} image`} width={264} height={159} draggable="false" onContextMenu={(e) => e.preventDefault()} />
            )}
            <div className={styles["card-body"]}>
              <h3>{po.title}</h3>
              <p>{po.description}</p>
              <p className={styles["card-body__tech"]}>{po.technologies.join(", ")}</p>
              <div className={styles["card-body__links"]}>
                {po.directLink || po.githubLink ? (
                  <>
                    {po.directLink && (
                      <span>
                        <a href={po.directLink} target="_blank">
                          Website Link
                        </a>
                      </span>
                    )}
                    {po.githubLink && (
                      <span>
                        <a href={po.githubLink} target="_blank">
                          Github Link
                        </a>
                      </span>
                    )}
                  </>
                ) : (
                  <span>No links available</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
