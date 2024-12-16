import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';
type ContructorState = {
  ingredients: TIngredient[];
  bun: TIngredient | null;
};
const initialState: ContructorState = {
  bun: null,
  ingredients: []
};
export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (payload: TIngredient) => ({
        payload: { ...payload, id: uuid() }
      }),
      reducer: (state, action: PayloadAction<TIngredient>) => {
        if (action.payload.type == 'bun') {
          state.bun = action.payload;
          return;
        }
        state.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const prevIndex = index - 1;
      const tmp = state.ingredients[prevIndex];
      state.ingredients[prevIndex] = state.ingredients[index];
      state.ingredients[index] = tmp;
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const prevIndex = index + 1;
      const tmp = state.ingredients[prevIndex];
      state.ingredients[prevIndex] = state.ingredients[index];
      state.ingredients[index] = tmp;
    },
    clearIngredients: () => initialState
  }
});
export const {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearIngredients
} = burgerConstructorSlice.actions;
