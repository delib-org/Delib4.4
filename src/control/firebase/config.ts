import { initializeApp } from "firebase/app";
import {  getFirestore } from "firebase/firestore";
//use this line in dev mode
// import { connectFirestoreEmulator } from "firebase/firestore";

import { getMessaging} from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./configFirebase";


console.log(`v4.0.06`);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);

//use this line in dev mode
// connectFirestoreEmulator(DB, "localhost", 8080);


