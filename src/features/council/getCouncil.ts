import { doc, onSnapshot } from "firebase/firestore";
import { DB } from "../../control/firebase/config";

export function listenToCouncil(
  councilId: string,
  setState: Function
): Function {
  try {
    const councilRef = doc(DB, "councils", councilId);
    return onSnapshot(
      councilRef,
      (councilDB) => {
        if (councilDB.exists()) {
          setState(councilDB.data());
        }
      },
      (e) => {
        console.info("Error at listenToCouncil");
        console.error(e);
      }
    );
  } catch (error) {
    return () => {};
  }
}
