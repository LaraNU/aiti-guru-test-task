import { Navigate } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/use-auth';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthorized } = useAuth();

  return !isAuthorized ? <>{children}</> : <Navigate to="/products" replace />;
};
