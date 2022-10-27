import { doc, onSnapshot } from "firebase/firestore";
import { DB } from "../../control/firebase/config";

export function listenToCounsil(
  councilId: string,
  setState: Function
): Function {
  try {
    const counsilRef = doc(DB, "counsils", councilId);
    return onSnapshot(counsilRef, (counsilDB) => {
      if (counsilDB.exists()) {
        setState(counsilDB.data());
      }
    },e=>{
      console.info('Error at listenToCounsil')
      console.error(e)});
  } catch (error) {
    return () => {};
  }
}
