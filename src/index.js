import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ApplicationContextProvider from "./context/Application";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApplicationContextProvider>
    <App />
  </ApplicationContextProvider>
);
