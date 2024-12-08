import { fetchIngridients } from '@services/burger-slice';
import { useAppDispatch, useAppSelector } from '@services/store';
import { useEffect } from 'react';

export const useIngredients = () => {
  const status = useAppSelector((s) => s.burger.ingredientsStatus);
  const ingredients = useAppSelector((s) => s.burger.ingridients);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIngridients());
    }
  }, [status]);
  return { status, ingredients };
};
