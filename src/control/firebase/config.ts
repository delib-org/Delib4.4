import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEK8XDQGaiID4UlsB8XU7dPZngIctgVcc",
  authDomain: "delib-v4-fb.firebaseapp.com",
  projectId: "delib-v4-fb",
  storageBucket: "delib-v4-fb.appspot.com",
  messagingSenderId: "956342083812",
  appId: "1:956342083812:web:49c50394b592dd7ca58cf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const auth = getAuth(app);