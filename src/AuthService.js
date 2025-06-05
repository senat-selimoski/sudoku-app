import store from './store';
import { setAuth, clearAuth } from './store/authSlice';

const AuthService = {
  login: async (username, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'user' && password === 'password') {
          const token = 'mock-jwt-token';
          const user = { username };
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          store.dispatch(setAuth({ isAuthenticated: true, user, token }));
          resolve({ token, user });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    store.dispatch(clearAuth());
  },
};

export default AuthService; 