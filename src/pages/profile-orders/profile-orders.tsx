import { useOrders } from '@hooks/useOrders';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const { orders } = useOrders();
  return <ProfileOrdersUI orders={orders} />;
};
