import { signout } from "@/firebase/auth/signout";
import { useGetUser } from "@/hooks/useGetUser";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import styles from "@/styles/nav.module.css";

type ToggleModal = {
  // toggleModal: (login?: boolean) => void;
  toggleAuthModal: (login?: boolean) => void;
  toggleConfirmModal: () => void;
};

const AuthOptions = ({ toggleAuthModal, toggleConfirmModal }: ToggleModal) => {
  const authUser = useGetUser();
  // const [toggleConfirm, setToggleConfirm] = useState<boolean>(false);

  // const userSignOut = () => {
  //   signout();
  //   setToggleConfirm(false);
  // };

  // const toggleConfirmModal = () => {
  //   setToggleConfirm((prev) => !prev);
  // };

  return (
    <>
      {/* {toggleConfirm && <ConfirmModal text={"sign out"} func={userSignOut} toggleConfirmModal={toggleConfirmModal} />} */}
      {authUser.loggedIn ? (
        <div>
          <span>{authUser.user?.displayName}</span>
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
