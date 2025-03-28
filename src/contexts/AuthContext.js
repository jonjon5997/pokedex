import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Load saved likes from localStorage when the user logs in
  useEffect(() => {
    if (user) {
      const savedFavorites =
        JSON.parse(localStorage.getItem(`favorites_${user.id}`)) || [];
      setFavorites(savedFavorites);
    }
  }, [user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const handleCardLike = (pokemon) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;

      // Check if pokemon is already in favorites
      const isCurrentlyLiked = prevFavorites.some(
        (fav) => fav.id === pokemon.id
      );

      if (!isCurrentlyLiked) {
        // Add the full pokemon object to favorites
        updatedFavorites = [...prevFavorites, pokemon];
      } else {
        // Remove the pokemon from favorites
        updatedFavorites = prevFavorites.filter((fav) => fav.id !== pokemon.id);
      }

      // Update localStorage with the full pokemon objects
      if (user) {
        localStorage.setItem(
          `favorites_${user.id}`,
          JSON.stringify(updatedFavorites)
        );
      }

      return updatedFavorites;
    });
  };

  useEffect(() => {
    if (token) {
      // Simulate checking token with backend
      setUser({
        id: "1234sdfasdf",
        name: "John Doe",
        email: "john@email.com",
        pfp: "https://google.com.",
      });
    }
  }, [token]);

  const login = (email, password) => {
    // Fake login logic
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeToken = "fake-auth-token";
        setToken(fakeToken);
        setUser({ name: "Fake User", email });
        localStorage.setItem("token", fakeToken);
        resolve(true);
      }, 1000);
    });
  };

  const register = (name, email, password) => {
    // Fake register logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        setUser,
        favorites,
        handleCardLike,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
