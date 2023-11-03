import React from "react";
import styles from "@/styles/portfolio.module.css";

type PortfolioInfo = {
  id: string;
  title: string;
  description: string;
  directLink?: string;
  githubLink?: string;
  technologies: string[];
};

const portfolioInfo: PortfolioInfo[] = [
  { id: "1", title: "Comic Webpage", description: "Website design idea for a non-existent comic", directLink: "https://comic-donid.netlify.app/", technologies: ["HTML", "CSS", "JS"] },
  {
    id: "2",
    title: "Quiz Webpage",
    description: "Simple quiz website where we can create our own questions and answers; features a scoreboard as well.",
    directLink: "https://donid-quiz.netlify.app/",
    githubLink: "https://github.com/mdonit/doni-quiz-app",
    technologies: ["React", "TypeScript", "Vite.js", "Firebase"],
  },
  {
    id: "3",
    title: "Barber Webpage",
    description: "Website idea for making appointment at the barber's; appointments can be deleted as well.",
    githubLink: "https://github.com/mdonit/barbers",
    technologies: ["Node.js", "MongoDB"],
  },
];

const PortfolioPage = () => {
  return (
    <div>
      <h2>Portfolio Categories Page</h2>
      <div className={styles.cardList}>
        {portfolioInfo.map((po) => (
          <div key={po.id} className={styles.card}>
            <h3>{po.title}</h3>
            <p>{po.description}</p>
            <div>
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
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
