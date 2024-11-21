import { getFeedsApi } from '@api';
import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
type TFeedsState = {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | SerializedError;
  data: TOrdersData;
};

export const initialState: TFeedsState = {
  status: 'idle',
  error: null,
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const feedInfo = createAsyncThunk('feeds/fetch', getFeedsApi);
export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(feedInfo.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(feedInfo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(feedInfo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    });
  }
});
