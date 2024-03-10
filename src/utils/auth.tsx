import { webAuth } from "@/firebase/firebase";
import axios from "axios";
import { User, signOut } from "firebase/auth";
import { BACKEND_URL } from "../constants";
import { navigateNewPage } from "./navigate";
import { USER_LOGIN } from "./routes";

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
    const response = await axios.post(`${BACKEND_URL}/firebase/login`, {
      email,
      password,
    });

    const userCredential = response.data;
    return userCredential;
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
