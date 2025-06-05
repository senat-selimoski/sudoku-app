import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../AuthService';
import { clearAuth } from '../store/authSlice';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    dispatch(clearAuth());
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="app-header-content">
        <h1>Sudoku App</h1>
        {isAuthenticated && (
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 