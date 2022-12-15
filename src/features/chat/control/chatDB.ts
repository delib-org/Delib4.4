import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { sortBy } from "lodash";
import { DB } from "../../../control/firebase/config";
import { ChatMessage, chatMessageJoi } from "../model/chatModel";
import { chatEmitter, ChatEvents } from "./chatEmitter";

export async function addChatMessageToDB(
  chatMessage: ChatMessage
): Promise<void> {
  try {
    const { error } = chatMessageJoi.validate(chatMessage);
    if (error) throw error;
    const { chatMessageId } = chatMessage;
    if (!chatMessageId) throw new Error("missing message id");

    const messageRef = doc(DB, "chatMessages", chatMessageId);
    await setDoc(messageRef, chatMessage, { merge: true });
  } catch (error) {
    console.error(error);
  }
}

export function listenToChatMessages(postId: string | undefined): Function {
  try {
    if (!postId) return () => {};

    const chatMessagesRef = collection(DB, "chatMessages");
    const q = query(
      chatMessagesRef,
      where("postId", "==", postId),
      orderBy("time", "desc"),
      limit(20)
    );

    return onSnapshot(q, (postsDB) => {
      postsDB.docChanges().forEach((change) => {
        try {
          const { error } = chatMessageJoi.validate(change.doc.data());
          if (error) throw error;

          if (change.type === "added") {
            console.log("New city: ", change.doc.data());
            chatEmitter.emit(
              ChatEvents.CHAT_CHANGE_MESSEGE,
              "added",
              change.doc.data()
            );
          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
            chatEmitter.emit(ChatEvents.CHAT_CHANGE_MESSEGE, "modified");
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
            chatEmitter.emit(ChatEvents.CHAT_CHANGE_MESSEGE, "removed");
          }
        } catch (error) {
          console.error(error);
        }
      });
    });
  } catch (error) {
    console.error(error);
    return () => {};
  }
}
