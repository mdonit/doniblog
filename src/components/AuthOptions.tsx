import { User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { firebaseAuth } from "@/firebase/config";
import { signout } from "@/firebase/auth/signout";
import { useGetUser } from "@/hooks/useGetUser";

// type CurrentUser = {
//   user: User | null;
//   loggedIn: boolean;
// };

type ToggleModal = {
  toggleModal: (login?: boolean) => void;
};

// const initialValue = {
//   user: null,
//   loggedIn: false,
// };

const AuthOptions = ({ toggleModal }: ToggleModal) => {
  const authUser = useGetUser();
  // useEffect(() => {
  //   const listen = onAuthStateChanged(firebaseAuth, (user) => {
  //     if (user) {
  //       setAuthUser({ user: user, loggedIn: true });
  //     } else {
  //       setAuthUser({ user: null, loggedIn: false });
  //     }
  //   });
  //   return () => {
  //     listen();
  //   };
  // }, []);

  return (
    <>
      {authUser.loggedIn ? (
        <div>
          <span>{authUser.user?.email}</span>
          <span onClick={signout}>Sign Out</span>
        </div>
      ) : (
        <div>
          <span onClick={() => toggleModal(false)}>Sign Up | </span>
          <span onClick={() => toggleModal(true)}>Log in</span>
        </div>
      )}
    </>
  );
};

export default AuthOptions;
