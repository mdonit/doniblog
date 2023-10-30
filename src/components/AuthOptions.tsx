import { signout } from "@/firebase/auth/signout";
import { useGetUser } from "@/hooks/useGetUser";

type ToggleModal = {
  toggleModal: (login?: boolean) => void;
};

const AuthOptions = ({ toggleModal }: ToggleModal) => {
  const authUser = useGetUser();

  return (
    <>
      {authUser.loggedIn ? (
        <div>
          <span>{authUser.user?.displayName}</span>
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
