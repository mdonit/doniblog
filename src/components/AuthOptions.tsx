import { useGetUser } from "@/hooks/useGetUser";
import styles from "@/styles/nav.module.css";

type ToggleModal = {
  toggleAuthModal: (login?: boolean) => void;
  toggleConfirmModal: () => void;
};

const AuthOptions = ({ toggleAuthModal, toggleConfirmModal }: ToggleModal) => {
  const authUser = useGetUser();

  return (
    <>
      {authUser.loggedIn ? (
        <div>
          <span className={styles["display-name"]}>{authUser.user?.displayName}</span>
          <span className={styles.authButton} onClick={toggleConfirmModal}>
            Sign Out
          </span>
        </div>
      ) : (
        <div>
          <span className={styles.authButton} onClick={() => toggleAuthModal(false)}>
            Sign Up
          </span>
          <span className={styles.authButton} onClick={() => toggleAuthModal(true)}>
            Log in
          </span>
        </div>
      )}
    </>
  );
};

export default AuthOptions;
