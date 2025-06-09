import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import puzzleReducer from './puzzleSlice';

const preloadedState = {};

// Attempt to load auth state from localStorage
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

if (token && user) {
  try {
    preloadedState.auth = {
      isAuthenticated: true,
      user: JSON.parse(user),
      token: token,
    };
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
    // Clear invalid data if parsing fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    puzzle: puzzleReducer,
  },
  preloadedState, // Pass the preloaded state to the store
});

export default store; 