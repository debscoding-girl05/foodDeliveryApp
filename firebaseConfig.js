import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 import {getAuth} from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAPkbmW-2e_I0xdjfQrbkr4ZD0z21X_LNk",
  authDomain: "delices-de-kevinne.firebaseapp.com",
  projectId: "delices-de-kevinne",
  storageBucket: "delices-de-kevinne.appspot.com",
  messagingSenderId: "954770510711",
  appId: "1:954770510711:web:8dff16d06281503a4b4772",
  measurementId: "G-CG942BE9YL",
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH =getAuth(FIREBASE_APP);



