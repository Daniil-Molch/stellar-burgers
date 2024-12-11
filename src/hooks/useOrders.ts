import { fetchOrders } from '@services/burger-slice';
import { useAppDispatch, useAppSelector } from '@services/store';
import { useEffect } from 'react';

export const useOrders = () => {
  const status = useAppSelector((s) => s.burger.ordersStatus);
  const orders = useAppSelector((s) => s.burger.orders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status == 'idle') {
      dispatch(fetchOrders());
    }
  }, [status]);
  return { status, orders };
};
