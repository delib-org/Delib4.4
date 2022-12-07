import Joi from "joi";
import { Feeling } from "../../feeling/model/feelingModel";
import { User, UserJoi } from "../../user/userModel";

export interface ChatMessage{
    chatMessageId?:string,
    councilId:string,
    boardMessageId:string,
    text:string,
    creator:User,
    time?:number,
    feelings?:Feeling[]
}

export const chatMessageJoi = Joi.object({
    chatMessageId:Joi.string().required(),
    councilId:Joi.string().required(),
    boardMessageId:Joi.string().required(),
    text:Joi.string().required(),
    creator:UserJoi,
    time:Joi.number().required(),
    feelings:Joi.array()
})