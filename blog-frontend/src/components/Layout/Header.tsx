// src/components/Layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import ThemeSwitcher from '../Common/ThemeSwitcher';
import Logout from '../Auth/Logout';
import { RootState } from '../../redux/store';

const Header: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Blog App
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Logout />
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
        <ThemeSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Header;