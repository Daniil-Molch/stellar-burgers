import { checkAuth } from '@services/auth-slice';
import { useAppDispatch, useAppSelector } from '@services/store';
import { useEffect } from 'react';

export const useAuth = () => {
  const isAuthChecked = useAppSelector((s) => s.auth.isAuthChecked); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const user = useAppSelector((s) => s.auth.auth?.user); // userDataSelector — селектор получения пользователя из store
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkAuth());
    }
  }, [isAuthChecked, dispatch]);
  return { isAuthChecked, user };
};
