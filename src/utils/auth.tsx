import { webAuth } from "@/firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { navigateNewPage } from "./navigate";
import { HOME_PAGE, USER_LOGIN } from "./routes";

export const signOutUser = () => {
  return signOut(webAuth)
    .then(() => {
      localStorage.removeItem("user");
      navigateNewPage(USER_LOGIN());
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
};

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      webAuth,
      email,
      password
    );
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify(user));
    navigateNewPage(HOME_PAGE());
  } catch (error: any) {
    console.error(error);
    alert(error?.message);
  }
};
