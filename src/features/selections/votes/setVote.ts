import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
// import { options } from "joi";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";
import { User } from "../../user/userModel";

export async function setVote(councilId: string, optionId: string, user: User) {
  try {
  
    const voteRef = doc(
      DB,
      Collections.COUNSILS,
      councilId,
      Collections.VOTES,
      user.uid
    );

    const userVote = await getDoc(voteRef);
    if (userVote.exists()) {
      if (userVote.data().vote === optionId) {
        //remove vote
        await deleteDoc(voteRef);
      } else {
        //change vote
        await setDoc(voteRef, { vote: optionId }, { merge: true });
      }
    } else {
      //set new vote
      await setDoc(voteRef, { vote: optionId }, { merge: true });
    }
  } catch (error) {
    console.error(error);
  }
}
