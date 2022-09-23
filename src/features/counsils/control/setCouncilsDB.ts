import { setDoc, doc } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Counsil } from "../../council/councilModel";

export async function addCouncilToDB(council: Counsil):Promise<void> {
  try {
    const councilRef = doc(DB, 'councils',council.councilId);
    await setDoc(councilRef,council);
    
  } catch (error) {
    console.error(error);
  }
}
