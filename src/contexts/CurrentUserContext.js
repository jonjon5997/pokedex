import { createContext, useState, useContext } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const handleCardLike = (pokemon) => {
    setFavorites((prevFavorites) => {
      // Check if the Pokémon is already in favorites using the name as id
      if (prevFavorites.some((fav) => fav.id === pokemon.id)) {
        // Remove it if already liked
        return prevFavorites.filter((fav) => fav.id !== pokemon.id);
      } else {
        // Add it if not already in favorites
        return [...prevFavorites, pokemon];
      }
    });
  };

  return (
    <CurrentUserContext.Provider value={{ favorites, handleCardLike }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
