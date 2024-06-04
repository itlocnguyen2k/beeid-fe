import React, { useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./@core/scss/core.scss";
import { history } from "./history";
import "./i18n";
import { Router } from "react-router-dom";
import { MessengerChat } from "react-messenger-chat-plugin";

const BrowserRouter = ({ basename, children }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), []);

  return <Router basename={basename} children={children} location={state.location} navigationType={state.action} navigator={history} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MessengerChat
      pageId="112368488406385"
      language="en_US"
      themeColor={"#1B74E4"}
      bottomSpacing={20}
      loggedInGreeting="Chào mừng bạn đến với hệ thống hỗ trợ quản lý công việc BeeId !"
      loggedOutGreeting="Hẹn gặp lại !"
      greetingDialogDisplay={"show"}
    />
    <App />
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
