import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('token');
  return isAuth ? <Outlet /> : <Navigate to="auth/login" />;
};

export default PrivateRoute;
