import {EventEmitter} from 'fbemitter';

export const chatEmitter = new EventEmitter();
export enum ChatEvents{
    CHAT_CHANGE_MESSEGE = 'change_chat_message'
} 