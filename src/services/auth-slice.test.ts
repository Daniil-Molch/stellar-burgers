import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { registerUser, authSlice, updateUser } from './auth-slice';
import { refreshToken } from '@api';

describe('тест асинхронных экшенов', () => {
  // т.к. тестируем асинхронный код то пользуемся async/await
  test('тест загрузки треков', async () => {
    const mockData = {
      success: true,
      refreshToken: 'test token',
      accessToken: 'test access',
      user: 'test user'
    };
    //@ts-expect-error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true
      })
    ) as jest.Mock;

    // создаем стор в который будем класть данные, полученные в результате fetchTracks
    const store = configureStore({
      reducer: { [authSlice.name]: authSlice.reducer }
    });

    // ожидаем завершение выполнение асинхронного экшена
    await store.dispatch(
      registerUser({
        password: '',
        email: '',
        name: ''
      })
    );

    const { isAuthChecked, auth } = store.getState().auth;
    // и сравниваем их с ожидаемым результатом
    expect(isAuthChecked).toEqual(true);
    expect(auth?.refreshToken).toEqual('test token');
    expect(auth?.accessToken).toEqual('test access');
    expect(auth?.user).toEqual('test user');
  });

  test('updateUser', async () => {
    const mockData = {
      success: true,
      user: 'test user'
    };
    //@ts-expect-error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true
      })
    ) as jest.Mock;
    
    global.document = {
      cookie: ''
    };

    // создаем стор в который будем класть данные, полученные в результате fetchTracks
    const store = configureStore({
      preloadedState: { auth: { auth: {}, isAuthChecked: true } },
      //@ts-expect-error
      reducer: { [authSlice.name]: authSlice.reducer }
    });

    // ожидаем завершение выполнение асинхронного экшена
    await store.dispatch(updateUser({}));

    const { auth } = store.getState().auth;
    // и сравниваем их с ожидаемым результатом
    expect(auth?.user).toEqual('test user');
  });
});
