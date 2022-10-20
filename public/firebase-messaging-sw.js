/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyBEumZUTCL3Jc9pt7_CjiSVTxmz9aMqSvo",
    authDomain: "synthesistalyaron.firebaseapp.com",
    databaseURL: "https://synthesistalyaron.firebaseio.com",
    projectId: "synthesistalyaron",
    storageBucket: "synthesistalyaron.appspot.com",
    messagingSenderId: "799655218679",
    appId: "1:799655218679:web:377e1d3144bdc1ceb9b2f2",
    measurementId: "G-TTDLRSW34L",
});

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
    console.log(title, body, image)
    // self.registration.showNotification(title, {
    //   body,
    //   icon: image || "/assets/icons/icon-72x72.png",
    // });
  });
}