import { useEffect } from "react";

import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLastNavigation, setUser } from "./features/user/userSlice";
import { listenToAuth, signInAnonym } from "./features/signin/signin";
import { listentToMessages } from "./control/firebase/fbMessaging";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  function registerUser(user: any) {
    dispatch(setUser(user));
  }
  useEffect(() => {
    listenToAuth(registerUser);
    listentToMessages();
    dispatch(setLastNavigation(location.pathname.toString()));
    signInAnonym();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
