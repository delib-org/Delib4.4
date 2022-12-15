import moment from "moment";
import React, { FC } from "react";
import { ChatMessage } from "../model/chatModel";

interface ChatMessageCardProps {
  message: ChatMessage;
}

const ChatMessageCard: FC<ChatMessageCardProps> = ({ message }) => {
 
  return (
    <div className="chatMessage">
      <div className="chatMessage__name">
        {message.creator.displayName || "Anonymus"}
      </div>
      <div className="chatMessage__text">{message.text}</div>
      <div className="chatMessage__time">{moment(message.time).startOf('hour').fromNow() }</div>
    </div>
  );
};

export default ChatMessageCard;
