/**
 * Renders the main React application component into the root element of the HTML document.
 * @param {React.Component} App - The main application component to render.
 * @returns None
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
