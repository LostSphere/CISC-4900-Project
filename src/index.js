import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from React 18
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
