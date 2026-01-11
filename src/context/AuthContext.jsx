import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { authService } from "../services";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to refresh user from localStorage
  const refreshUser = useCallback(() => {
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
      return storedUser;
    } else {
      setUser(null);
      setIsAuthenticated(false);
      return null;
    }
  }, []);

  // Check for stored user on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = authService.getStoredUser();
        const token = localStorage.getItem('token');

        if (storedUser && token) {
          setUser(storedUser);
          setIsAuthenticated(true);
        } else if (token && !storedUser) {
          // Token exists but user data missing - try to refetch
          console.warn('Token exists but user data is missing');
          // For now, just mark as authenticated but user will need to be fetched
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });

      setUser(response);
      setIsAuthenticated(true);
      toast.success('Login successful!');

      return response;
    } catch (error) {
      const message =
        error?.message ||
        error?.error ||
        "An error occurred during login";

      toast.error(message);
      throw error;
    }
  };


  const signUp = async (email, password, fullName) => {
    try {
      const response = await authService.register({
        email,
        password,
        fullName
      });

      setUser(response);
      setIsAuthenticated(true);
      toast.success('Registration successful!');

      return response;
    } catch (error) {
      const message =
        error?.message ||
        error?.error ||
        "An error occurred during registration";

      toast.error(message);
      throw error;
    }
  }

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
    }
  }



  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signUp,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
