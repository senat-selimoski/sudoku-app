import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import puzzleReducer from './puzzleSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    puzzle: puzzleReducer,
  },
});

export default store; 