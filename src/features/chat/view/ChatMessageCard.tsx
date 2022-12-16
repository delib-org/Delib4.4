import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../model/hooks";
import { selectUser } from "../../user/userSlice";
import { ChatMessage } from "../model/chatModel";

interface ChatMessageCardProps {
  message: ChatMessage;
}

const ChatMessageCard: FC<ChatMessageCardProps> = ({ message }) => {
  const user = useAppSelector(selectUser);
  const [isCreator, setIsCreator] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setIsCreator(user.uid === message.creator.uid);
    }
  }, [message.creator.uid, user]);

  return (
    <div
      className={
        isCreator ? "chatMessage chatMessage--creator" : "chatMessage"
      }>
      <div className="chatMessage__name">
        {message.creator.displayName || "Anonymus"}
      </div>
      <div className="chatMessage__text">{message.text}</div>
      <div className="chatMessage__time">
        {moment(message.time).startOf("hour").fromNow()}
      </div>
    </div>
  );
};

export default ChatMessageCard;
