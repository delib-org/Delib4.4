import { collection, onSnapshot } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";

export function listenToOptionsOfCounsil(
  councilId: string,
  setState: Function
): Function {
  try {
    const counsilRef = collection(
      DB,
      Collections.COUNSILS,
      councilId,
      Collections.OPTIONS
    );
    return onSnapshot(counsilRef, (optionsDB) => {
      optionsDB.forEach((optionDB) => {
        setState(optionDB.data());
      });
    });
  } catch (error) {
    console.error(error);
    return () => {};
  }
}
