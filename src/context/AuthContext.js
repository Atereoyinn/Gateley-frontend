import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Define fetchCurrentUser inside useEffect
      const fetchCurrentUser = async () => {
        try {
          const response = await api.get('/user/me'); // Replace with your backend endpoint
          setCurrentUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          logout();
        } finally {
          setLoading(false);
        }
      };

      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []); // Empty dependency array


  const login = async (email, password) => {
    try {
      setError(null);
      const response = await api.post('/login', { email, password });
      const { access_token } = response.data;
  
      // Store token
      localStorage.setItem('token', access_token);
  
      // Fetch user details
      const userResponse = await api.get('/user/me');
      const user = userResponse.data;
  
      // Store user details
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
  
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};