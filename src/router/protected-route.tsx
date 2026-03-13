import { Navigate } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/use-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthorized } = useAuth();

  return isAuthorized ? <>{children}</> : <Navigate to="/login" replace />;
};
