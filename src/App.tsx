import { useEffect } from "react";

import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLastNavigation, setUser } from "./features/user/userSlice";
import { listenToAuth, signInAnonym } from "./features/signin/signin";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  function registerUser(user: any) {
    dispatch(setUser(user));
  }
  useEffect(() => {
    listenToAuth(registerUser);
    dispatch(setLastNavigation(location.pathname));
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
