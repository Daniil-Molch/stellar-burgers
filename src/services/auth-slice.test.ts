import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  registerUser,
  authSlice,
  updateUser,
  loginUser,
  checkAuth,
  logOutUser
} from './auth-slice';

describe('тест асинхронных экшенов', () => {
  // т.к. тестируем асинхронный код то пользуемся async/await
  test('registerUser Fulfilled', async () => {
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
  test('loginUser', async () => {
    const mockData = {
      success: true,
      user: 'test user',
      refreshToken: 'test token',
      accessToken: 'test access'
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
    global.localStorage = {
      setItem: () => {}
    };

    // создаем стор в который будем класть данные, полученные в результате fetchTracks
    const store = configureStore({
      reducer: { [authSlice.name]: authSlice.reducer }
    });

    // ожидаем завершение выполнение асинхронного экшена
    await store.dispatch(
      loginUser({
        email: '',
        password: ''
      })
    );

    // и сравниваем их с ожидаемым результатом
    const { isAuthChecked, auth } = store.getState().auth;
    expect(isAuthChecked).toEqual(true);
    expect(auth?.refreshToken).toEqual('test token');
    expect(auth?.accessToken).toEqual('test access');
    expect(auth?.user).toEqual('test user');
  });
  test('checkAuthFullfilled', async () => {
    const mockData = {
      success: true,
      refreshToken: '',
      accessToken: '',
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
    await store.dispatch(checkAuth());

    const { isAuthChecked, auth } = store.getState().auth;
    // и сравниваем их с ожидаемым результатом
    expect(isAuthChecked).toEqual(true);
    expect(auth?.refreshToken).toEqual('');
    expect(auth?.accessToken).toEqual('');
    expect(auth?.user).toEqual('test user');
  });
  test('checkAuthRejected', async () => {
    //@ts-expect-error
    global.fetch = jest.fn(() =>
      Promise.reject()
    ) as jest.Mock;

    // создаем стор в который будем класть данные, полученные в результате fetchTracks
    const store = configureStore({
      reducer: { [authSlice.name]: authSlice.reducer }
    });

    // ожидаем завершение выполнение асинхронного экшена
    await store.dispatch(checkAuth());
    const { isAuthChecked, auth } = store.getState().auth;
    // и сравниваем их с ожидаемым результатом
    expect(isAuthChecked).toEqual(true);
    expect(auth).toEqual(null);
  });
  test('loginUserRejected', async () => {
    const mockData = {
      success: false,
      state: null
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
      loginUser({
        email: '',
        password: ''
      })
    );
    const { isAuthChecked, auth } = store.getState().auth;
    // и сравниваем их с ожидаемым результатом
    expect(isAuthChecked).toEqual(true);
    expect(auth).toEqual(null);
  });
  test('logOutUserFullfilled', async () => {
    const mockData = {
      success: true,
      // refreshToken: 'test',
      // accessToken: '',
      state: null
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
    const setItem = jest.fn();
    global.localStorage = {
      setItem: setItem,
      getItem:()=>""
    };

    // создаем стор в который будем класть данные, полученные в результате fetchTracks
    const store = configureStore({
      reducer: { [authSlice.name]: authSlice.reducer }
    });

    // ожидаем завершение выполнение асинхронного экшена
    await store.dispatch(logOutUser());

    // и сравниваем их с ожидаемым результатом
    const { isAuthChecked, auth } = store.getState().auth;
    expect(auth).toEqual(null);

    expect(setItem).toBeCalledWith('refreshToken', '');
    expect(document.cookie).toEqual("accessToken=; path=/");
  });
});
