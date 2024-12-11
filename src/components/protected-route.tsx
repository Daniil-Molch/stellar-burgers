import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router';
import { ReactNode } from 'react';
import { useAuth } from '@hooks/useAuth';
type ProtectedRouteProps = {
  children: ReactNode;
  disAuth?: boolean;
};
export const ProtectedRoute = ({
  children,
  disAuth = false
}: ProtectedRouteProps) => {
  const { isAuthChecked, user } = useAuth();
  const location = useLocation();

  if (!isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }
  if (disAuth && user) {
    return <Navigate to={'/'} />;
  }
  if (!disAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
