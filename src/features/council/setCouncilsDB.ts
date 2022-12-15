import Joi from "joi";
import { setDoc, doc } from "firebase/firestore";
import { DB } from "../../control/firebase/config";
import { Collections } from "../../control/firebase/dbModel";
import { Council } from "./councilModel";
import { User, UserJoi } from "../user/userModel";

export async function addCouncilToDB(council: Council): Promise<void> {
  try {
    const councilRef = doc(DB, Collections.COUNSILS, council.councilId);
    await setDoc(councilRef, council);
  } catch (error) {
    console.error(error);
  }
}



export async function registerToCouncil({
  user,
  councilId,
}: {
  user: User;
  councilId: string;
}): Promise<void> {
  try {
    const registerToCouncilJoi = Joi.object({
      user: UserJoi,
      councilId: Joi.string().required(),
    });
    const { error } = registerToCouncilJoi.validate({ user, councilId });
    if (error) throw error;
   
    const membershipRef = doc(DB, "councils", councilId, "members", user.uid);
    await setDoc(membershipRef, user);
  } catch (error: any) {
    console.error(error.message);
    console.error(error);
  }
}
