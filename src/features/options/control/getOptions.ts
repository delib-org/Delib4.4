import { collection, doc, onSnapshot } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";
import { OptionJoi } from "../model/optionModel";

export function listenToOptionsOfCouncil(
  councilId: string,
  setState: Function
): Function {
  try {
    const councilRef = collection(
      DB,
      Collections.COUNSILS,
      councilId,
      Collections.OPTIONS
    );
    return onSnapshot(councilRef, (optionsDB) => {
      optionsDB.docChanges().forEach((change) => {
        try {
          const { error } = OptionJoi.validate(change.doc.data());
          if (error) throw error;

          if (change.type === "added") {
            // console.log("New city: ", change.doc.data());
            setState(change.doc.data());
          }
          if (change.type === "modified") {
         
            setState(change.doc.data());
          }
          if (change.type === "removed") {
            // console.log("Removed city: ", change.doc.data());
          }
        } catch (error) {
          console.error(error);
        }
      });
    });
  } catch (error) {
    console.error(error);
    return () => {};
  }
}

export function listenToVotedOption(
  councilId: string | undefined,
  userId: string | undefined,
  setState: Function
): Function {
  try {
    if (!userId || !councilId) throw new Error("No user or no council");
    const userVoteRef = doc(
      DB,
      Collections.COUNSILS,
      councilId,
      Collections.VOTES,
      userId
    );

    return onSnapshot(userVoteRef, (userVoteDB) => {
      if (userVoteDB.exists()) {
        const votedOptionId: string = userVoteDB.data().vote;
        setState(votedOptionId);
      } else {
        setState("");
      }
    });
  } catch (error) {
    console.error(error);
    return () => {};
  }
}
