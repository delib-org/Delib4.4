import React, { useEffect, useState, useRef } from "react";
import { uuidv4 } from "@firebase/util";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../model/hooks";
import { selectUser } from "../../user/userSlice";
import { addChatMessageToDB, listenToChatMessages } from "../control/chatDB";
import { selectChatsByPostId, setChatMessage } from "../control/chatSlice";
import { ChatMessage } from "../model/chatModel";
import ChatMessageCard from "./ChatMessageCard";
import Header from "../../../view/components/Header";
import { selectPost, setPost } from "../../board/control/boardSlice";
import { listenToPosts } from "../../board/control/postsDB";
import { Post } from "../../board/model/postModel";
import Scrollable from "../../../view/components/scrolable/Scrolable";

const Chat = () => {
  const [isFirstScroll, setIsFirstScroll] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { councilId, postId } = useParams();
  const post = useAppSelector(selectPost(postId));
  const messages = useAppSelector(selectChatsByPostId(postId));
  const messagesDiv = useRef<any>(null);

  function addPostAsync(post: Post) {
    dispatch(setPost(post));
  }

  useEffect(() => {
    const unsub = listenToChatMessages(postId);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let unsub = () => {};
    if (!post && councilId) {
      unsub = listenToPosts(councilId, addPostAsync);
    }
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  // useEffect(() => {
  //   console.log("messages", messages.length);
  //   if (isFirstScroll && messages.length > 0) {
  //     console.log("scroll!",messagesDiv.current.scrollHeight);
  //     messagesDiv.current.scrollTo({ top: messagesDiv.current.scrollHeight });
  //     setIsFirstScroll(false);
  //   } else {
  //     messagesDiv.current.scrollTo({
  //       top: messagesDiv.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [messages]);

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

    dispatch(setChatMessage(message));
    addChatMessageToDB(message);
    ev.target.reset();
  }

  return (
    <div className="page chat">
      <Header back={`council/${post?.councilId}/board`} title={post?.text} />
      <Scrollable numberOfChildren={messages.length}>
        <>
          {messages.map((msg) => (
            <ChatMessageCard key={msg.chatMessageId} message={msg} />
          ))}
        </>
      </Scrollable>

      <form onSubmit={handleAddMessage}>
        <div className="inputBox">
          <textarea required name="chatInput"></textarea>
          <button>
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
