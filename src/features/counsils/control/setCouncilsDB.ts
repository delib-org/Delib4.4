import { setDoc, doc } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Council } from "../councilModel";

export async function addCouncilToDB(council: Council):Promise<void> {
  try {
    const councilRef = doc(DB, 'councils',council.councilId);
    const councilDB = await setDoc(councilRef,council);
    console.log(councilDB);
  } catch (error) {
    console.error(error);
  }
}
