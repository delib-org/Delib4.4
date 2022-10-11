import { doc, getDoc, setDoc } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";
import { User } from "../../user/userModel";

export async function setVote(councilId: string, optionId: string, user: User) {
  try {
    console.log(user);
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
        await setDoc(voteRef, { vote: "" }, { merge: true });
      } else {
        await setDoc(voteRef, { vote: optionId }, { merge: true });
      }
    } else {
      await setDoc(voteRef, { vote: optionId }, { merge: true });
    }
  } catch (error) {
    console.error(error);
  }
}
