import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  fetchIngridients,
  fetchOrders,
  createOrder,
  burgerSlice
} from './burger-slice';

describe('тест асинхронных экшенов', () => {
  // т.к. тестируем асинхронный код то пользуемся async/await
  test('fetchIngridientsFulfilled', async () => {
    const mockData = {
      success: true,
      data: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        }
      ]
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
      reducer: { [burgerSlice.name]: burgerSlice.reducer }
    });

    // ожидаем завершение выполнение асинхронного экшена
    await store.dispatch(fetchIngridients());

    const { ingridients, ingredientsStatus } = store.getState().burger;
    // и сравниваем их с ожидаемым результатом
    expect(ingredientsStatus).toEqual('succeeded');
    expect(ingridients.length).toEqual(1);
  });
  test('fetchIngridientsPending', async () => {
    //@ts-expect-error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => new Promise(() => {}),
        ok: true
      })
    ) as jest.Mock;

    // создаем стор в который будем класть данные, полученные в результате fetchTracks
    const store = configureStore({
      reducer: { [burgerSlice.name]: burgerSlice.reducer }
    });

    // ожидаем завершение выполнение асинхронного экшена
    store.dispatch(fetchIngridients());

    const { ingridients, ingredientsStatus } = store.getState().burger;
    // и сравниваем их с ожидаемым результатом
    expect(ingredientsStatus).toEqual('pending');
    expect(ingridients.length).toEqual(0);
  });
  test('fetchOrdersFulfilled', async () => {
    const mockData = {
      success: true,

      orders: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        }
      ]
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
      reducer: { [burgerSlice.name]: burgerSlice.reducer }
    });

    // ожидаем завершение выполнение асинхронного экшена
    await store.dispatch(fetchOrders());

    const { orders, ordersStatus } = store.getState().burger;
    // и сравниваем их с ожидаемым результатом
    expect(ordersStatus).toEqual('succeeded');
    expect(orders.length).toEqual(1);
  });
  test('fetchOrdersPending', async () => {
    //@ts-expect-error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => new Promise(() => {}),
        ok: true
      })
    ) as jest.Mock;

    // создаем стор в который будем класть данные, полученные в результате fetchTracks
    const store = configureStore({
      reducer: { [burgerSlice.name]: burgerSlice.reducer }
    });

    // ожидаем завершение выполнение асинхронного экшена
    store.dispatch(fetchOrders());

    const { orders, ordersStatus } = store.getState().burger;
    // и сравниваем их с ожидаемым результатом
    expect(ordersStatus).toEqual('pending');
    expect(orders.length).toEqual(0);
  });
  test('createOrderFulfilled', async () => {
    const mockData = {
      success: true,

      order: {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
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
      reducer: { [burgerSlice.name]: burgerSlice.reducer }
    });

    // ожидаем завершение выполнение асинхронного экшена
    await store.dispatch(createOrder([]));

    const { orders, ordersStatus } = store.getState().burger;
    // и сравниваем их с ожидаемым результатом
    expect(orders.length).toEqual(1);
    expect(orders[0]).toEqual(mockData.order)
  });
});
