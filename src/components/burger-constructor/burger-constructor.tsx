import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '@services/store';
import { createOrder } from '@services/burger-slice';
import { useNavigate } from 'react-router-dom';
import { clearIngredients } from '@services/constructor-slice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useAppSelector((state) => state.burgerConstructor);
  console.log(constructorItems);
  const [orderRequest, setOrderRequest] = useState(false);
  const dispatch = useAppDispatch();
  const [orderModalData, setOrderModaldata] = useState<TOrder | null>(null);
  const navigate = useNavigate();
  const hasUser = useAppSelector((s) => !!s.auth.auth?.user);
  const onOrderClick = () => {
    if (!hasUser) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIds = constructorItems.ingredients.map((i) => i._id);
    ingredientsIds.push(constructorItems.bun._id);
    setOrderRequest(true);
    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then((data) => {
        dispatch(clearIngredients());
        setOrderModaldata(data.order);
      })
      .finally(() => {
        setOrderRequest(false);
      });
  };
  const closeOrderModal = () => {
    setOrderModaldata(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s: number, v) => s + v.price, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
