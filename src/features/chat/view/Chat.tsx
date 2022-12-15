import React, { useEffect } from "react";
import { uuidv4 } from "@firebase/util";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { selectUser } from "../../user/userSlice";
import { addChatMessageToDB, listenToChatMessages } from "../control/chatDB";
import { selectChatsByPostId, setChatMessage } from "../control/chatSlice";
import { ChatMessage } from "../model/chatModel";
import ChatMessageCard from "./ChatMessageCard";

const Chat = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { councilId, postId } = useParams();
  const messages = useAppSelector(selectChatsByPostId(postId));
  console.log(messages);

  useEffect(()=>{
    console.log('listenToChatMessages', postId)
    const unsub = listenToChatMessages(postId);
    return ()=>unsub();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function handleAddMessage(ev: any) {
    ev.preventDefault();
    const text = ev.target.elements.chatInput.value;
    if (!(text && user && councilId && postId))
      throw new Error(
        `s=one of this is missing: "text", user, ouncilId, postId: ${text} ${councilId}, ${postId}`
      );

    const message: ChatMessage = {
      chatMessageId: uuidv4(),
      councilId,
      postId,
      text,
      creator: user,
      time: new Date().getTime(),
      feelings: [],
    };
    console.log(message);
    dispatch(setChatMessage(message));
    addChatMessageToDB(message);
    ev.target.reset();
  }

  return (
    <div className="chat">
      <div className="wrapper">
        <div className="chatMessages">
          {messages.map(msg=><ChatMessageCard key={msg.chatMessageId} message={msg}/>)}
        </div>
        <form onSubmit={handleAddMessage}>
          <div className="inputBox">
            <textarea required name="chatInput"></textarea>
            <button>
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
