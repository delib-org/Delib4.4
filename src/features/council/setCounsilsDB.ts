import { setDoc, doc } from "firebase/firestore";
import { DB } from "../../control/firebase/config";
import { Collections } from "../../control/firebase/dbModel";
import { MessagingIntensity } from "../messages/messagingModel";
import { Counsil } from "./councilModel";

export async function addCouncilToDB(counsil: Counsil): Promise<void> {
  try {
    const counsilRef = doc(DB, Collections.COUNSILS, counsil.counsilId);
    await setDoc(counsilRef, counsil);
  } catch (error) {
    console.error(error);
  }
}

export async function setRegisterToPushNotifications(
  counsilId: string,
  userId: string,
  messagingIntensity:MessagingIntensity,
  token:string
): Promise<void> {
  try {
    const counsilNotificationRef = doc(
      DB,
      Collections.COUNSILS,
      counsilId,
      "members",
      userId
    );
    
    await setDoc(counsilNotificationRef, { token, messagingIntensity });
    console.log("set token for push notifications");
  } catch (error) {
    console.error(error);
  }
}
