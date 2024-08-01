import React, { createContext, useState, useContext } from 'react';

const OverlayContext = createContext();

export const useOverlay = () => useContext(OverlayContext);

export const OverlayProvider = ({ children }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayContent, setOverlayContent] = useState(null);

  const showOverlay = (content) => {
    setOverlayContent(content);
    setIsOverlayOpen(true);
  };

  const hideOverlay = () => {
    setIsOverlayOpen(false);
    setOverlayContent(null);
  };

  return (
    <OverlayContext.Provider value={{ isOverlayOpen, overlayContent, showOverlay, hideOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};
