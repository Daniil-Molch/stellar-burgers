import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './constructor-slice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerSlice } from './burger-slice';
import { authSlice } from './auth-slice';
import { feedSlice } from './feedInfo';

export const rootReducer = combineReducers({
  [burgerSlice.name]: burgerSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [feedSlice.name]: feedSlice.reducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
