import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from './store/authSlice';

import LoginForm from './components/LoginForm';
import Header from './components/Header';
import SudokuGrid from './components/SudokuGrid';
import './App.css';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null; 
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/puzzle'); // Redirect to puzzle if authenticated
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? null : children; // Render children only if not authenticated
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      dispatch(setAuth({ isAuthenticated: true, user: JSON.parse(user), token }));
    }
  }, [dispatch]);

  const currentYear = new Date().getFullYear();

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="/puzzle"
              element={
                <PrivateRoute>
                  <SudokuGrid />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; {currentYear} Senat Selimoski. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
