import Joi from "joi";
import { User, UserJoi } from "../../user/userModel";

export enum Support{
    SUPPORT = 'support',
    OPPOSE = 'oppose',
    NEUTRAL = 'neutral'
}

export interface PostOption{
    optionId:string,
    title:string,
    support:Support
}

export interface Post{
    text:string;
    time:number;
    creator:User;
    postId:string;
    councilId:string;
    option?:PostOption
}

export const PostJoi = Joi.object({
    text:Joi.string().required(),
    councilId:Joi.string().required(),
    postId:Joi.string().required(),
    time:Joi.number(),
    creator:UserJoi,
    option:Joi.object({
        optionId:Joi.string().required(),
        title:Joi.string().required(),
        support:Joi.string().allow(Support)
    }).optional()
})