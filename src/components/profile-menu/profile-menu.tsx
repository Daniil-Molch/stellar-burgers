import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '@services/store';
import { logOutUser } from '@services/auth-slice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logOutUser()).unwrap();
    } catch (_) {}
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
