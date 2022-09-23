import {doc, setDoc } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";
import { User } from "../../user/userModel";

export async function setVote(councilId:string, optionId:string, user:User){
    try {
        console.log(user)
        const voteRef = doc(DB,Collections.COUNSILS,councilId,Collections.VOTES,'votes');
        const vote:any = {};
        vote[user.uid] = optionId;


        await setDoc(voteRef,vote,{merge:true});
    } catch (error) {
        console.error(error)
    }
}