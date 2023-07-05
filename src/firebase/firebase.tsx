import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const devConfig = {
  apiKey: publicRuntimeConfig.FIREBASE_API_KEY,
  authDomain: publicRuntimeConfig.FIREBASE_AUTH_DOMAIN,
  databaseURL: publicRuntimeConfig.FIREBASE_DATABASE_URL,
  projectId: publicRuntimeConfig.FIREBASE_PROJECT_ID,
  storageBucket: publicRuntimeConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: publicRuntimeConfig.FIREBASE_MESSAGING_SENDER_ID,
  appId: publicRuntimeConfig.FIREBASE_APP_ID,
};

let firebase: any = null;
let webAuth: any = null;

// @ts-ignore
if (!firebase) {
  firebase = initializeApp(devConfig);
  webAuth = getAuth();
}

export { firebase, webAuth };
