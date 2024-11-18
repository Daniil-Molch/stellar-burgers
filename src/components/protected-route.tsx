import { Preloader } from '@ui';
import { useAppDispatch, useAppSelector } from '../services/store';
// import {
//   isAuthCheckedSelector,
//   userDataSelector
// } from '../services/store/selectors';
import { Navigate, useLocation } from 'react-router';
import { ReactNode, useEffect } from 'react';
import { authSlice, checkAuth } from '@services/auth-slice';
import { useAuth } from '@hooks/useAuth';
type ProtectedRouteProps = {
  children: ReactNode;
};
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthChecked, user } = useAuth();

  const location = useLocation();
  const pathName = location.pathname;

  if (!isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!user) {
    console.log(pathName);
    if (pathName == '/login') {
      return children;
    }
    // если пользователя в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' />;
  }

  return children;
};
