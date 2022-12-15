import moment from "moment";
import React, { FC } from "react";
import { ChatMessage } from "../model/chatModel";

interface ChatMessageCardProps {
  message: ChatMessage;
}

const ChatMessageCard: FC<ChatMessageCardProps> = ({ message }) => {
  console.log(message.time)
  return (
    <div className="chatMessage">
      <div className="chatMessage__name">
        {message.creator.displayName || "Anonymus"}
      </div>
      <div className="chatMessage__text">{message.text}</div>
      <div className="chatMessage__time">{moment(message.time).endOf('day').fromNow() }</div>
    </div>
  );
};

export default ChatMessageCard;
