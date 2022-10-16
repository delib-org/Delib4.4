import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
    apiKey: "AIzaSyBEumZUTCL3Jc9pt7_CjiSVTxmz9aMqSvo",
    authDomain: "synthesistalyaron.firebaseapp.com",
    databaseURL: "https://synthesistalyaron.firebaseio.com",
    projectId: "synthesistalyaron",
    storageBucket: "synthesistalyaron.appspot.com",
    messagingSenderId: "799655218679",
    appId: "1:799655218679:web:377e1d3144bdc1ceb9b2f2",
    measurementId: "G-TTDLRSW34L",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);