import { getIngredientsApi, getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

type BurgerState = {
  ingridients: TIngredient[];
  orders: TOrder[];
  ingredientsStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  ingredietnsError: string | null;
  ordersStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  ordersError: string | null;
};
const initialState: BurgerState = {
  ingridients: [],
  orders: [],
  ingredientsStatus: 'idle',
  ingredietnsError: null,
  ordersStatus: 'idle',
  ordersError: null
};
export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchIngridients.fulfilled, (state, action) => {
      // Add user to the state array
      state.ingridients = action.payload;
      state.ingredientsStatus = 'succeeded';
    });
    builder.addCase(fetchIngridients.pending, (state) => {
      state.ingredientsStatus = 'pending';
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.ordersStatus = 'succeeded';
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.ordersStatus = 'pending';
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload.order);
    });
  }
});
export const fetchIngridients = createAsyncThunk(
  'users/fetchByIdStatus',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
export const fetchOrders = createAsyncThunk('order/fetchOrder', async () => {
  const response = await getOrdersApi();
  return response;
});
export const createOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);
export const getOrderByNumber= createAsyncThunk("order/getOrderByNumber",getOrderByNumberApi)
