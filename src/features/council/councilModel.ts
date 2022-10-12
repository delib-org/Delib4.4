import { OptionsView } from "../options/model/optionModel";
import { User } from "../user/userModel";

export interface Counsil {
  title: string;
  counsilId:string;
  description:string;
  defaultOptionsView:OptionsView;
  creator:User;
  color:string;
  lastAction:number;
}
