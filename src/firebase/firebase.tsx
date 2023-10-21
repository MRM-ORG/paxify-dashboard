import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

// const devConfig = {
//   apiKey: publicRuntimeConfig.FIREBASE_API_KEY,
//   authDomain: publicRuntimeConfig.FIREBASE_AUTH_DOMAIN,
//   databaseURL: publicRuntimeConfig.FIREBASE_DATABASE_URL,
//   projectId: publicRuntimeConfig.FIREBASE_PROJECT_ID,
//   storageBucket: publicRuntimeConfig.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: publicRuntimeConfig.FIREBASE_MESSAGING_SENDER_ID,
//   appId: publicRuntimeConfig.FIREBASE_APP_ID,
// };

const devConfig = {
    apiKey: 'AIzaSyCG4a-bv9sXCxF_MOKaJGS_1FAnH0W-rDc',
    authDomain: 'paxify-db.firebaseapp.com',
    databaseURL: 'https://paxify-db-default-rtdb.firebaseio.com',
    projectId: 'paxify-db',
    storageBucket: 'paxify-db.appspot.com',
    messagingSenderId: '840559381657',
    appId: '1:840559381657:web:4cbc3429f1db50e8293c08',
  };

// let firebase: any = null;
// let webAuth: any = null;

// @ts-ignore
// if (!firebase) {
let firebase = initializeApp(devConfig);
let webAuth = getAuth();
// }

export { firebase, webAuth };
