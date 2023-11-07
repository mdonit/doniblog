import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "@/styles/nav.module.css";

const loading = () => {
  return (
    <section className={styles["loading-screen"]}>
      <AiOutlineLoading3Quarters className={styles["loading-icon"]} size={50} />
    </section>
  );
};

export default loading;
