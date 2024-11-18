import { useOrders } from '@hooks/useOrders';
import { feedInfo } from '@services/feedInfo';
import { useAppDispatch, useAppSelector } from '@services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.feeds.data.orders);
  const status = useAppSelector((state) => state.feeds.status);

  useEffect(() => {
    dispatch(feedInfo());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(feedInfo());
  };

  if (status !== 'succeeded') {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
