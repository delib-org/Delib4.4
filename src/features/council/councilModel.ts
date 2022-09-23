import { OptionsView } from "../options/optionsModel";
import { User } from "../user/userModel";

export interface Counsil {
  title: string;
  councilId:string;
  description:string;
  defaultOptionsView:OptionsView;
  creator:User
}
