import { webAuth } from "@/firebase/firebase";
import {
  User,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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

    return userCredential.user;
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

export const isUserVerified = () => {
  const user = localStorage.getItem("user") as string;
  try {
    const userObj = JSON.parse(user);
    return userObj.emailVerified;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user") as string;
  try {
    const userObj = JSON.parse(user);
    return userObj;
  } catch (error) {
    console.error(error);
    return null;
  }
};
