"use client";
import styles from "@/styles/modal.module.css";

type ConfirmWindow = {
  text: string;
  func: () => void;
  toggleConfirmModal: () => void;
};

const ConfirmModal = ({ text, func, toggleConfirmModal }: ConfirmWindow) => {
  return (
    <div className={styles.modal}>
      <div className={`${styles.form} ${styles["form--confirm"]}`}>
        <h3>Confirmation</h3>
        <div>
          <p>Are you sure you want to {text}?</p>
        </div>
        <div className={styles["form__buttons"]}>
          <button onClick={func}>Yes</button>
          <button onClick={toggleConfirmModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
