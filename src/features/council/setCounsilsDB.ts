import { setDoc, doc } from "firebase/firestore";
import { DB } from "../../control/firebase/config";
import { Collections } from "../../control/firebase/dbModel";
import { Counsil } from "./councilModel";

export async function addCouncilToDB(counsil: Counsil):Promise<void> {
  try {
    const councilRef = doc(DB, Collections.COUNSILS,counsil.counsilId);
    await setDoc(councilRef,counsil);
    
  } catch (error) {
    console.error(error);
  }
}
