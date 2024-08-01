import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx"; // Import UserProvider
import PlayerContextProvider from "./context/playerContext.jsx";
import { SearchProvider } from "./context/searchContext.jsx";
import { OverlayProvider } from "./context/overlayContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <PlayerContextProvider>
        <SearchProvider>
          <OverlayProvider>
            <App />
          </OverlayProvider>
        </SearchProvider>
      </PlayerContextProvider>
    </UserProvider>
  </BrowserRouter>
);
