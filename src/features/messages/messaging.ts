import { doc, setDoc } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
import { DB, messaging } from "../../control/firebase/config";
import { Collections } from "../../control/firebase/dbModel";
import { MessagingIntensity } from "./messagingModel";

export enum PermmisionAction {
  ADD_OPTION = "add-option",
  VOTED = "voted",
  ADD_COUNCIL = "add-council",
}

export function listenToPushNotifications() {

  onMessage(messaging, (payload) => {
   
    // ...
  });
}

export function saveTokenToSessionStorage() {
  getToken(messaging, {
    vapidKey:
      "BOXKnicJW5Cu3xwRG7buXf-JU8tS-AErJX_Ax7CsUwqZQvBvo2E-ECnE-uGvUKcgeL-1nT-cJw8qGo4dH-zrfGA",
  })
    .then((token: string) => {
    
      sessionStorage.setItem("token", token);
    })
    .catch((e) => console.error(e));
}

export async function requestPermission() {
  try {
  
    if (!("Notification" in window)) {
      alert(
        "To use this app, please use a different browser which support push-notifications"
      );
      throw new Error("no push notification in browser");
    }

    if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  } catch (error) {
    console.error(error);
  }
}

export async function setRegisterToPushNotifications(
  councilId: string,
  userId: string,
  messagingIntensity: MessagingIntensity,
  token: string
): Promise<void> {
  try {
    const councilNotificationRef = doc(
      DB,
      Collections.COUNSILS,
      councilId,
      "members",
      userId
    );

    await setDoc(councilNotificationRef, { token, messagingIntensity }, {merge:true});
  } catch (error) {
    console.error(error);
  }
}
