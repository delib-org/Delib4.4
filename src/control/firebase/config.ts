import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { connectFirestoreEmulator  } from "firebase/firestore";
//use this line in dev mode
// import { connectFirestoreEmulator } from "firebase/firestore";

import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getAuth, connectAuthEmulator} from "firebase/auth";
import {firebaseConfig} from './configFirebase';




console.log(`v4.0.76`);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);

//use this line in dev mode
// connectFirestoreEmulator(DB, "localhost", 8080);

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});

getToken(messaging, {
  vapidKey:
    "BOXKnicJW5Cu3xwRG7buXf-JU8tS-AErJX_Ax7CsUwqZQvBvo2E-ECnE-uGvUKcgeL-1nT-cJw8qGo4dH-zrfGA",
})
  .then((token: string) => {
    sessionStorage.setItem("token", token);
  })
  .catch((e) => console.error(e));

  //development

console.info("Running on development mode")


connectFirestoreEmulator(DB, '127.0.0.1', 8080);
connectAuthEmulator(auth, "http://127.0.0.1:9099");

