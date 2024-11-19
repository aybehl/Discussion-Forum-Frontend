import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "../api/user";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("jwtToken"));
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = sessionStorage.getItem("userId");
      if (isAuthenticated && userId) {
        setLoading(true);
        try {
          const response = await getUserProfile(userId);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          logout();
          throw error;
        } finally {
          setLoading(false); // Done loading
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]); // Refetch user profile if authentication state changes

  const login = async (token) => {
    sessionStorage.setItem("jwtToken", token);
    setIsAuthenticated(true);
    setLoading(true); // Trigger loading until user profile is fetched
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await getUserProfile(userId);
      setUser(response.data);
    } catch (error) {
      console.error("Error during login profile fetch:", error);
      logout(); // Handle error by clearing session
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </UserContext.Provider>
  );
};
