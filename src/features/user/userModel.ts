import Joi from 'joi';

export interface User{
    uid:string;
    photoURL:string|null;
    isAnonymous:boolean;
    emailVerified:boolean
    email:string|null;
    displayName:string|null;
}

export const UserJoi = Joi.object({
    uid:Joi.string().required(),
    photoURL:Joi.string().allow(null),
    isAnonymous:Joi.boolean(),
    emailVerified:Joi.boolean(),
    email:Joi.string().allow(null),
    displayName:Joi.string().allow(null)
})