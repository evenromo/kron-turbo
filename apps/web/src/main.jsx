import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
const rootContainerElement = ReactDOMClient.createRoot(root);

rootContainerElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
