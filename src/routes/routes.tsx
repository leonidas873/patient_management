import React from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { AddPatient, EditPatient, Login, PatientListPage } from '../pages';
import PublicRoute from '../components/PublicRoute';
import NotFound from '../pages/notFount';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        // only accessible when not logged in.
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
      // Protected routes: require authentication
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/', element: <PatientListPage /> },
          { path: 'add-patient', element: <AddPatient /> },
          { path: 'edit-patient/:id', element: <EditPatient /> }
        ]
      },
      // Fallback route
      { path: '*', element: <NotFound /> }
    ]
  }
];

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

export default AppRoutes;
