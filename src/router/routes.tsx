import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { LoginPage } from '@/pages/login-page';
import { ProductsPage } from '@/pages/products-page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'products',
        Component: ProductsPage,
      },
    ],
  },
]);
