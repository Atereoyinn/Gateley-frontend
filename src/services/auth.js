import api from './api';

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Get current user token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Set token in localStorage and Axios headers
export const setToken = (token) => {
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Remove token from localStorage and Axios headers
export const removeToken = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};