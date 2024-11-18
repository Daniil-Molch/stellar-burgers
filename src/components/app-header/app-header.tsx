import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '@services/store';
import { useAuth } from '@hooks/useAuth';

export const AppHeader: FC = () => {
  const  {user}=useAuth();
  const userName=user?.name
  return <AppHeaderUI userName={userName} />;
};
