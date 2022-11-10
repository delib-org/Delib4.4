import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";

export function listenToCouncils(setState: Function): Function {
  try {
    const councilsRef = collection(DB, Collections.COUNSILS);
    const q = query(councilsRef, orderBy("lastAction"));
    return onSnapshot(q, (councilsDB) => {
      councilsDB.forEach((councilDB) => {
        if (councilDB.exists()) {
          setState(councilDB.data());
        }
      });
    });
  } catch (error) {
    console.error(error);
    return () => {};
  }
}
