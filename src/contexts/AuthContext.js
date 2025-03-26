import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      // Simulate checking token with backend
      setUser({ name: "Fake User", email: "fake@example.com" });
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
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
