import { doc } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { OptionProps } from "../model/optionModel";

export function addOptionToDB(option:OptionProps){
    try {
        const optionRef = doc(DB,'counsils',option.counsilId)
    } catch (error) {
        console.error(error)
    }
} 