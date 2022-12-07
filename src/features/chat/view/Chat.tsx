import React from "react";
import { uuidv4 } from "@firebase/util";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { selectUser } from "../../user/userSlice";
import { addChatMessageToDB } from "../control/chatDB";
import { setChatMessage } from "../control/chatSlice";
import { ChatMessage } from "../model/chatModel";

const Chat = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { councilId, boardMessageId } = useParams();

  function handleAddMessage(ev: any) {
    ev.preventDefault();
    const text = ev.target.elements.chatInput.value;
    if (!(text && user && councilId && boardMessageId))
      throw new Error(
        `s=one of this is missing: "text", user, ouncilId, boardMessageId: ${text} ${councilId}, ${boardMessageId}`
      );

    const message: ChatMessage = {
      chatMessageId: uuidv4(),
      councilId,
      boardMessageId,
      text,
      creator: user,
      time:new Date().getTime(),
      feelings: [],
    };
    console.log(message)
    dispatch(setChatMessage(message));
    addChatMessageToDB(message);
  }

  return (
    <div className="chat">
      <div className="wrapper">
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
