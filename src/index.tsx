import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./model/store";
import { Provider } from "react-redux";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Page404 from "./view/pages/Page404";
import Login from "./view/pages/login/Login";
import Feed from "./features/feed/Feed";
import Main from "./features/main/Main";
import App from "./App";
import AddCouncil from "./features/counsils/view/AddCounsil";
import CouncilPage from "./features/council/Counsil";

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
          { path: "", element: <Feed /> },
          { path: "add-counsil", element: <AddCouncil /> },
        ],
      },
      {
        path: "/counsil/:counsilId",
        element: <CouncilPage />,
      },
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
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
