import React from 'react';
import { Container } from '@mui/material';
import Login from '../components/Auth/Login';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Login />
    </Container>
  );
};

export default LoginPage;