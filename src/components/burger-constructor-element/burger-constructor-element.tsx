import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient
} from '@services/constructor-slice';
import { useAppDispatch } from '@services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const handleMoveUp = () => {
      dispatch(moveUpIngredient(index));
    };

    const handleMoveDown = () => {
      dispatch(moveDownIngredient(index));
    };

    const handleClose = () => {
      dispatch(deleteIngredient(ingredient._id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
