import React, { createContext, useState } from "react";

export const CurrentUserContext = createContext();

// Create the provider component
export const CurrentUserProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
  };

  return (
    <CurrentUserContext.Provider value={{ favorites, updateFavorites }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
