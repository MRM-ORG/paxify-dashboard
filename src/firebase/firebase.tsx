import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const devConfig = {
  apiKey: "AIzaSyAEs-7Ke1EEhDzzJgm2jsjMGscKzGdONTg",
  authDomain: "paxify-reels-analytics.firebaseapp.com",
  databaseURL: "https://paxify-reels-analytics-default-rtdb.firebaseio.com",
  projectId: "paxify-reels-analytics",
  storageBucket: "paxify-reels-analytics.appspot.com",
  messagingSenderId: "1045743904613",
  appId: "1:1045743904613:web:65bf104b710360945ee38c",
};

let firebase: any = null;
let webAuth: any = null;

// @ts-ignore
if (!firebase) {
  firebase = initializeApp(devConfig);
  webAuth = getAuth();
}

export { firebase, webAuth };
