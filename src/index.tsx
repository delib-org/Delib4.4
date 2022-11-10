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
import AddCouncil from "./features/counsils/view/AddCounsil";
import CounsilPage from "./features/council/Counsil";
import Counsils from "./features/counsils/view/Counsils";

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
          { path: "", element: <Counsils /> },
          { path: "add-counsil", element: <AddCouncil /> },
        ],
      },
      {
        path: "/counsil/:counsilId",
        element: <CounsilPage />
      },
      {
        path: "/counsil/:counsilId/:section",
        element: <CounsilPage />
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
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
