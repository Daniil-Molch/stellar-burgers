import { rootReducer } from './store';
import store from './store';

describe('Тестирование rootReducer', () => {
  test('Вызов rootReducer', () => {
    const before = store.getState();
    const after = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(after).toEqual(before);
  });
});
