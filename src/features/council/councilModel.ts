import { OptionsView } from "../options/model/optionModel";
import { User } from "../user/userModel";

export interface Council {
  title: string;
  councilId: string;
  description: string;
  defaultOptionsView: OptionsView;
  creator: User;
  color: string;
  lastAction: number;
  positionA?:Postion;
  positionB?:Postion;
  positionMiddle?:Postion
}

export interface Postion{
  text:string,
    result:string
}
