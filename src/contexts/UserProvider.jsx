import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "../api/user";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("jwtToken"));

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const userId = sessionStorage.getItem("userId");
          const response = await getUserProfile(userId);
          setUser(response);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
          setIsAuthenticated(false); // Log out user on error (e.g., token expired)
          throw error;
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]); // Refetch user profile if authentication state changes

  const login = (token) => {
    sessionStorage.setItem("jwtToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
