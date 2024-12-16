import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  burgerConstructorSlice,
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearIngredients
} from './constructor-slice';

describe('тест экшенов для burgerConstructorSlice', () => {
  // Определите начальное состояние для тестов
  const initialState = {
    bun: null,
    ingredients: []
  };

  // Создаем стор для тестов
  const setUpStore = () =>
    configureStore({
      reducer: { [burgerConstructorSlice.name]: burgerConstructorSlice.reducer }
    });
  const createIngredient = (id: string = '0',type:string="sause") => ({
    _id: id,
    name: 'Краторная булка N-200i',
    type,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  });
  test('добавление ингредиента в конструктор бургера', () => {
    const store = setUpStore();
    const ingredient = createIngredient();
    store.dispatch(addIngredient(ingredient));

    const { ingredients } = store.getState()[burgerConstructorSlice.name];
    expect(ingredients).toContainEqual(ingredient);
  });

  test('установка булочки через добавление ингредиента', () => {
    const store = setUpStore();
    const bun = createIngredient("0","bun");
    store.dispatch(addIngredient(bun));

    const { bun: storedBun } = store.getState().burgerConstructor;
    expect(storedBun).toEqual(bun);
  });

  test('удаление ингредиента', () => {
    const store = setUpStore();
    const ingredient1 = createIngredient('1');
    const ingredient2 = createIngredient('2');
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(addIngredient(ingredient2));

    store.dispatch(deleteIngredient('1'));
    const { ingredients } = store.getState().burgerConstructor;
    expect(ingredients).not.toContainEqual(ingredient1);
    expect(ingredients).toContainEqual(ingredient2);
  });

  test('перемещение ингредиента вверх', () => {
    const store = setUpStore();
    const ingredient1 = createIngredient('1');
    const ingredient2 = createIngredient('2');
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(addIngredient(ingredient2));

    store.dispatch(moveUpIngredient(1)); // Перемещение Cheddar вверх
    const { ingredients } = store.getState().burgerConstructor;
    expect(ingredients[0]).toEqual(ingredient2);
    expect(ingredients[1]).toEqual(ingredient1);
  });

  test('перемещение ингредиента вниз', () => {
    const store = setUpStore();
    const ingredient1 = createIngredient('1');
    const ingredient2 = createIngredient('2');
    store.dispatch(addIngredient(ingredient1));
    store.dispatch(addIngredient(ingredient2));

    store.dispatch(moveDownIngredient(0)); // Перемещение BBQ вниз
    const { ingredients } = store.getState().burgerConstructor;
    expect(ingredients[0]).toEqual(ingredient2);
    expect(ingredients[1]).toEqual(ingredient1);
  });

  test('очистка ингредиентов', () => {
    const store = setUpStore();
    const ingredient = createIngredient();
    store.dispatch(addIngredient(ingredient));

    store.dispatch(clearIngredients());
    const state = store.getState().burgerConstructor;
    expect(state).toEqual(initialState);
  });
});
