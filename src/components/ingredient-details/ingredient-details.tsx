import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientData = useAppSelector((s) =>
    s.burger.ingridients.find((i) => i._id == id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
