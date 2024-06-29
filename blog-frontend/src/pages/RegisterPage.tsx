import React from 'react';
import { Container } from '@mui/material';
import Register from '../components/Auth/Register';

const RegisterPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Register />
    </Container>
  );
};

export default RegisterPage;