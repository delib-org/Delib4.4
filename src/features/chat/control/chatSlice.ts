import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage } from "../model/chatModel";
import { RootState } from "../../../model/store";
import { uuidv4 } from "@firebase/util";
import { updateArray } from "../../../control/helpers";



export interface ChatsState {
  chats: Array<ChatMessage>;
}

const initialState: ChatsState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {

    setChatMessage:(state,action:PayloadAction<ChatMessage>)=>{
        const chatMessage = {...action.payload}
        if(!chatMessage.chatMessageId) chatMessage.chatMessageId = uuidv4();
        if(!chatMessage.time) chatMessage.time = new Date().getTime();

        state.chats = updateArray(state.chats,chatMessage, 'chatMessageId');
    }
  },
});

export const {setChatMessage} = chatSlice.actions;

export const selectChats = (state: RootState) => state.chats.chats

export default chatSlice.reducer;
