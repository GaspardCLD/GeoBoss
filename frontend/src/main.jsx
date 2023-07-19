import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "../context/AuthContext";
import { StatesProvider } from "../context/StatesContext";
import { GameProvider } from "../context/GameContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <GameProvider>
        <StatesProvider>
          <App />
        </StatesProvider>
      </GameProvider>
    </AuthProvider>
  </React.StrictMode>
);
