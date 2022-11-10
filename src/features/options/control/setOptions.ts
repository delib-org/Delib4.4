import { doc, setDoc } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { Collections } from "../../../control/firebase/dbModel";
import { OptionJoi, OptionProps } from "../model/optionModel";

export async function addOptionToDB(option: OptionProps) {
  try {
    const { error } = OptionJoi.validate(option);
    if (error) throw error;

    const optionRef = doc(
      DB,
      Collections.COUNSILS,
      option.councilId,
      Collections.OPTIONS,
      option.optionId
    );
    await setDoc(optionRef, option);
  } catch (error) {
    console.error(error);
  }
}
