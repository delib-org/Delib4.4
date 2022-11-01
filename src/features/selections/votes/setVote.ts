import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { options } from "joi";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";
import { User } from "../../user/userModel";

export async function setVote(councilId: string, optionId: string, user: User) {
  try {
    const voteRef = doc(
      DB,
      Collections.COUNSILS,
      councilId,
      Collections.OPTIONS,
      optionId,
      Collections.VOTES,
      user.uid
    );

    const memberRef = doc(
      DB,
      Collections.COUNSILS,
      councilId,
      Collections.MEMBERS,
      user.uid
    );

    const userVote = await getDoc(voteRef);
    if (userVote.exists()) {
      await Promise.all([
        deleteDoc(voteRef),
        setDoc(memberRef, { vote: false }, { merge: true }),
      ]);
      // await deleteDoc(voteRef);
      // await setDoc(memberRef,{vote:false},{merge:true});
    } else {
      await Promise.all([
        setDoc(voteRef, { vote: true }),
        setDoc(memberRef, { vote: optionId }, { merge: true }),
      ]);
    }
  } catch (error) {
    console.error(error);
  }
}
