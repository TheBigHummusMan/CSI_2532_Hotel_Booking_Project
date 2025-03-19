import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const NAS = localStorage.getItem('NAS');
  return NAS ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;