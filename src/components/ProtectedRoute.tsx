// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Role } from '../types/apiTypes';

interface ProtectedRouteProps {
  allowedRoles?: Role[];       
  children?: React.ReactNode; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-found" />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
