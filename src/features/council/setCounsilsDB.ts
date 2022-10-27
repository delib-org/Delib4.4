import Joi from 'joi';
import { setDoc, doc } from "firebase/firestore";
import { DB } from "../../control/firebase/config";
import { Collections } from "../../control/firebase/dbModel";
import { MessagingIntensity } from "../messages/messagingModel";
import { Counsil } from "./councilModel";
import { User, UserJoi } from '../user/userModel';

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



export async function registerToCounsil({user, counsilId}:{user:User, counsilId:string} ):Promise<void>{
  try {
    const registerToCounsilJoi = Joi.object({
      user:UserJoi,
      counsilId:Joi.string().required()
    })
    const {error} = registerToCounsilJoi.validate({user, counsilId});
    if(error) throw error;
console.log('counsil',counsilId,'members',user.uid)
    const membershipRef = doc(DB,'counsils',counsilId,'members',user.uid);
    await setDoc(membershipRef,user);
  } catch (error:any) {
    console.error(error.message);
    console.error(error);
  }
}
