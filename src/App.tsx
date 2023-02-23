import { useEffect } from "react";

import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { setLastNavigation, setUser } from "./features/user/userSlice";
import { listenToAuth, signInAnonym } from "./features/signin/signin";
import {
  listenToPushNotifications,
  saveTokenToSessionStorage,
} from "./features/messages/messaging";
import { chatEmitter, ChatEvents } from "./features/chat/control/chatEmitter";
import { ChatMessage } from "./features/chat/model/chatModel";
import { useAppDispatch } from "./model/hooks";
import { setChatMessage } from "./features/chat/control/chatSlice";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  function registerUser(user: any) {
    dispatch(setUser(user));
  }
  useEffect(() => {
    listenToAuth(registerUser);
    listenToPushNotifications();
    saveTokenToSessionStorage();
    dispatch(setLastNavigation(location.pathname.toString()));
    signInAnonym();
    chatEmitter.addListener(
      ChatEvents.CHAT_CHANGE_MESSEGE,
      (event: string, chatMessage: ChatMessage) => {
        if (event === "added") dispatch(setChatMessage(chatMessage));
      }
    );

    // Navigator.setAppBadge(12);
    if ("setAppBadge" in navigator) {
      console.log("a badge in app");
      //@ts-ignore
      // navigator.setAppBadge(12);
    } else {
      console.log("no badge in app");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
