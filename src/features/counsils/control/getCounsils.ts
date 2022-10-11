import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";

export function listenToCounsils(setState: Function): Function {
  try {
   
    const counsilsRef = collection(DB, Collections.COUNSILS);
    const q = query(counsilsRef,orderBy('lastAction'));
    return onSnapshot(q, (counsilsDB) => {
  
      counsilsDB.forEach((counsilDB) => {
     
        if (counsilDB.exists()) {
          setState(counsilDB.data());
        }
      });
    });
  } catch (error) {
    console.error(error);
    return () => {};
  }
}
