import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import {  connectFirestoreEmulator } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// firebase deploy --only hosting
const firebaseConfig = {
  apiKey: "AIzaSyBEumZUTCL3Jc9pt7_CjiSVTxmz9aMqSvo",
  authDomain: "synthesistalyaron.firebaseapp.com",
  databaseURL: "https://synthesistalyaron.firebaseio.com",
  projectId: "synthesistalyaron",
  storageBucket: "synthesistalyaron.appspot.com",
  messagingSenderId: "799655218679",
  appId: "1:799655218679:web:377e1d3144bdc1ceb9b2f2",
  measurementId: "G-TTDLRSW34L",
};

console.log(`v4.0.05`);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const auth = getAuth(app);
export const messaging: any = getMessaging(app);

// getToken(messaging,{vapidKey: "BOXKnicJW5Cu3xwRG7buXf-JU8tS-AErJX_Ax7CsUwqZQvBvo2E-ECnE-uGvUKcgeL-1nT-cJw8qGo4dH-zrfGA"}).then((t:any)=>console.log(t)).catch(e=>console.error(e));
// connectFirestoreEmulator(DB, "localhost", 8080);

