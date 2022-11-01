import { collection, doc, onSnapshot } from "firebase/firestore";
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

export function listenToVotedOption(
  counsilId: string | undefined,
  userId: string | undefined,
  setState: Function
): Function {

  try {
    if (!userId || !counsilId) throw new Error("No user or no counsil");
    const userVoteRef = doc(
      DB,
      Collections.COUNSILS,
      counsilId,
      Collections.VOTES,
      userId
    );

    return onSnapshot(userVoteRef, (userVoteDB) => {
      if (userVoteDB.exists()) {
        const votedOptionId:string = userVoteDB.data().vote;
        setState(votedOptionId);
      } else{
        setState('');
      }
    });

  } catch (error) {
    console.error(error);
    return () => {};
  }
}
