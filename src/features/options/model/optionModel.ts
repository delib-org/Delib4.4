import { User } from "../../user/userModel";


export interface OptionProps {
  title: string;
  description: string;
  optionId: string;
  counsilId: string;
  votes:number;
  creator:User
}

export enum OptionsView{
  BARS = 'bars'
}
