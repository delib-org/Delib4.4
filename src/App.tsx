import { useEffect } from "react";

import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLastNavigation, setUser } from "./features/user/userSlice";
import { listenToAuth, signInAnonym } from "./features/signin/signin";
import {
  listenToPushNotifications,
  saveTokenToSessionStorage,
} from "./features/messages/messaging";

function App() {
  const dispatch = useDispatch();
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

    // Navigator.setAppBadge(12);
    if ("setAppBadge" in navigator) {
      console.log('a badge in app')
      //@ts-ignore
      // navigator.setAppBadge(12);
    } else{
      console.log('no badge in app')
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
