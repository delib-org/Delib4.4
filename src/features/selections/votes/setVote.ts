import {doc, setDoc } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";
import { User } from "../../user/userModel";

export async function setVote(councilId:string, optionId:string, user:User){
    try {
        console.log(user)
        const voteRef = doc(DB,Collections.COUNSILS,councilId,Collections.VOTES,user.uid);
       
        await setDoc(voteRef,{vote:optionId},{merge:true});
    } catch (error) {
        console.error(error)
    }
}