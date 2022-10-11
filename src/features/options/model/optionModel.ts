import { User } from "../../user/userModel";


export interface OptionProps {
  title: string;
  description: string;
  optionId: string;
  counsilId: string;
  votes:number;
  creator:User
  userVotedOption?:boolean
}

export enum OptionsView{
  BARS = 'bars'
}

export interface OptionsOfCounsilListener{
  counsilId:string,
  on:boolean
}
