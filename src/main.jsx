import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "leaflet/dist/leaflet.css";
import "./style.css";
import "leaflet/dist/leaflet";
import ContextProvider from "./context/GameContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

