import Joi from "joi";
import { User, UserJoi } from "../../user/userModel";

export interface OptionProps {
  created: number;
  title: string;
  description: string;
  optionId: string;
  councilId: string;
  councilTitle: string;
  votes: number;
  creator: User;
  userVotedOption?: boolean;
  lastVoted?: number;
  color: string;
  width?: number;
  left?: number;
  order?: number;
  creationOrder?: number;
  relativePlace?: number;
}

export const OptionJoi = Joi.object({
  created: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  optionId: Joi.string().required(),
  councilId: Joi.string().required(),
  councilTitle: Joi.string().required(),
  votes: Joi.number().required(),
  creator: UserJoi,
  userVotedOption: Joi.boolean(),
  lastVoted: Joi.number(),
  color: Joi.string().required(),
  width: Joi.number(),
  left: Joi.number(),
  order: Joi.number(),
  creationOrder: Joi.number(),
  relativePlace: Joi.number(),
});

export enum OptionsView {
  BARS = "bars",
  BOARD = "board",
}

export interface OptionsOfCouncilListener {
  councilId: string;
  on: boolean;
}

export enum Order {
  RANDOM = "random",
  NEW = "lastVoted",
  VOTED = "votes",
}
