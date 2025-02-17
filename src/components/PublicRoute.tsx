import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
