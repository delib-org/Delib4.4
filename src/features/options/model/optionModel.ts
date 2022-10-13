import { User } from "../../user/userModel";


export interface OptionProps {
  created: number;
  title: string;
  description: string;
  optionId: string;
  counsilId: string;
  votes:number;
  creator:User
  userVotedOption?:boolean;
  lastVoted?:number;
  color:string;
  width?:number;
  left?:number;
  order?:number;
}

export enum OptionsView{
  BARS = 'bars'
}

export interface OptionsOfCounsilListener{
  counsilId:string,
  on:boolean
}

export enum Order{
  RANDOM = 'random',
  NEW = 'lastVoted',
  VOTED = 'votes'
}
