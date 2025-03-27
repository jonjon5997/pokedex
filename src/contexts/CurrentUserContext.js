import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // Make sure the path is correct

export const CurrentUserContext = createContext();

// Create the provider component
export const CurrentUserProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Optionally load favorites from localStorage or an API if needed
    // E.g., setFavorites(localStorage.getItem("favorites") || []);
  }, []);

  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    // Optionally save favorites to localStorage
    // localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <CurrentUserContext.Provider value={{ user, favorites, updateFavorites }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
