import { doc, setDoc } from "firebase/firestore";
import { DB } from "../../../control/firebase/config";
import { ChatMessage, chatMessageJoi } from "../model/chatModel";

export async function addChatMessageToDB(chatMessage:ChatMessage):Promise<void>{
    try {
      
        const {error} = chatMessageJoi.validate(chatMessage);
        if(error) throw error;
        const {chatMessageId} = chatMessage
        if(!chatMessageId) throw new Error('missing message id');
        console.log(chatMessage)
        const messageRef = doc(DB,'chats',chatMessageId);
        const chatMessageDB = await setDoc(messageRef,chatMessage,{merge:true});
        console.log(chatMessageDB)

    } catch (error) {
        console.error(error);
    }

}