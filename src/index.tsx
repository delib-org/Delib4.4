import React from "react";
import ReactDOM from "react-dom/client";
import "./view/styles/app.scss";
import { store } from "./model/store";
import { Provider } from "react-redux";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Page404 from "./view/pages/Page404";
import Login from "./view/pages/login/Login";
import Main from "./features/main/Main";
import App from "./App";
import AddCouncil from "./features/councils/view/AddCouncil";
import CouncilPage from "./features/council/Council";
import Councils from "./features/councils/view/Councils";
import Chat from "./features/chat/view/Chat";
import CouncilWelcome from "./features/councilWelcome/CouncilWelcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: "/main",
        element: <Main />,
        children: [
          { path: "", element: <Councils /> },
          { path: "add-council", element: <AddCouncil /> },
        ],
      },
      {
        path: "/council/:councilId",
        element: <CouncilPage />,
      },
      {
        path: "/council/:councilId/welcome",
        element: <CouncilWelcome />,
      },
      {
        path: "/council/:councilId/:section",
        element: <CouncilPage />,
      },
      { path: "/council/:councilId/chat/:postId", element: <Chat /> },
      {
        path: "",
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
