import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TUser } from '@utils-types';
import { setCookie } from '../utils/cookie';

type AuthState = {
  auth: {
    refreshToken: string;
    accessToken: string;
    user: TUser;
  } | null;
  isAuthChecked: boolean;
};
const initialState: AuthState = {
  auth: null,
  isAuthChecked: false
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(registerUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.auth = {
        refreshToken: action.payload.refreshToken,
        accessToken: action.payload.accessToken,
        user: action.payload.user
      };
      state.isAuthChecked = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.auth = {
        refreshToken: '',
        accessToken: '',
        user: action.payload.user
      };
      state.isAuthChecked = true;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.auth = null;
      state.isAuthChecked = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.auth = action.payload;
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      state.isAuthChecked = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.auth = null;
      state.isAuthChecked = true;
    });
    builder.addCase(logOutUser.fulfilled, (state) => {
      setCookie('accessToken', '');
      localStorage.setItem('refreshToken', '');
      state.auth = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (!state.auth) {
        return;
      }
      state.auth.user = action.payload.user;
    });
  }
});
type RegisterUserParams = {
  password: string;
  email: string;
  name: string;
};
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ password, email, name }: RegisterUserParams) => {
    const response = await registerUserApi({
      password,
      email,
      name
    });
    return response;
  }
);
export const checkAuth = createAsyncThunk('auth/checkAuth', getUserApi);
export const loginUser = createAsyncThunk('auth/loginUser', loginUserApi);
export const logOutUser = createAsyncThunk('auth/logout', logoutApi);
export const updateUser = createAsyncThunk('auth/update', updateUserApi);
export const resetPassword = createAsyncThunk('auth/reset', resetPasswordApi);
