import { doc, setDoc } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";
import { OptionProps } from "../model/optionModel";

export async function addOptionToDB(option:OptionProps){
    try {
        
        const optionRef = doc(DB,Collections.COUNSILS,option.counsilId, Collections.OPTIONS,option.optionId);
        await setDoc(optionRef,option);
    } catch (error) {
        console.error(error)
    }
} 