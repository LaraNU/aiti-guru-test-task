import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import { LoginPage } from '@/pages/login-page';
import { ProductsPage } from '@/pages/products-page';

import { ProtectedRoute } from './protected-route';
import { PublicRoute } from './public-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/products" replace />,
      },
    ],
  },
]);
