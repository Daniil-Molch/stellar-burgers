import * as order from '../fixtures/newOrder.json';

describe('E2E тест конструктора бургеров', () => {
  beforeEach(() => {});

  it('добавление булки', () => {
    const mockBun = {
      _id: 'test1',
      name: 'test',
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
    };
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      // fixture: 'ingredients.json'
      body: {
        success: true,
        data: [mockBun]
      }
    });
    cy.visit('http://localhost:4000');
    cy.get(`[data-cy="burger-ingredient-${mockBun._id}"] button`).click();
    cy.get('[data-cy="constructor-element-top"]').should(
      'contain',
      `${mockBun.name} (верх)`
    );
  });
  it('работа модального окна', () => {
    const mockBun = {
      _id: 'test1',
      name: 'test',
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
    };
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      // fixture: 'ingredients.json'
      body: {
        success: true,
        data: [mockBun]
      }
    });
    cy.visit('http://localhost:4000');
    cy.get(`[data-cy="burger-ingredient-${mockBun._id}"]`).click();
    cy.get('[data-cy="modal"]').within(() => {
      cy.get('[data-cy="modal-title"]').should('contain', 'IngredientDetails');
      cy.get("[data-cy='modal-body'] h3").should('contain', mockBun.name);
      cy.get("[data-cy='close-modal']").click();
    });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
  it('создание заказа', () => {
    const mockBun = {
      _id: 'test1',
      name: 'test',
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
    };
    const mockUserData = {
      success: true,
      user: {
        email: 'test@mail.ru',
        name: 'testname'
      }
    };
    cy.setCookie('accessToken', 'access-token');
    localStorage.setItem('refreshToken', 'refresh-token');
    cy.intercept('GET', 'api/auth/user', {
      body: mockUserData
    });
    cy.intercept('POST', 'api/orders', { body:{...order} });
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      // fixture: 'ingredients.json'
      body: {
        success: true,
        data: [mockBun]
      }
    });
    cy.visit('http://localhost:4000');
    cy.get(`[data-cy="burger-ingredient-${mockBun._id}"] button`).click();
    cy.get('[data-cy="constructor-element-top"]').should(
      'contain',
      `${mockBun.name} (верх)`
    );
    cy.get('[data-cy="order-button"]').click();
    cy.get('[data-cy="modal"]').within(() => {
      cy.get("[data-cy='modal-body'] h2").should('contain', order.order.number);
      cy.get("[data-cy='close-modal']").click();
    });
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="constructor-element-top"]').should('not.exist');
    cy.get('[data-cy="empty-bun-top"]').should('exist');
  });
  afterEach(() => {
    // Очистка фейковых токенов
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
// #root > div > main > div > section.gWGQQO_DR2tGAz6JfTJw > div > ul:nth-child(2) > li:nth-child(2) > button

// describe('Проверка работы модальных окон описаний ингредиентов', () => {
//   describe('Проверка открытия модальных окон', () => {
//     it('Базовое открытие по карточке ингредиента', () => {});

//     it('Модальное окно с ингредиентом будет открыто после перезагрузки страницы', () => {});
//   });

//   describe('Проверка закрытия модальных окон', () => {
//     it('Через нажатие на крестик', () => {});

//     it('Через нажатие на оверлей', () => {});

//     it('Через нажатие на Escape', () => {});
//   });
// });

// describe('Процесс оформления заказа', () => {
//   beforeEach(() => {});

//   it('Базовая процедура оформления ПОСЛЕ авторизации', () => {});

//   afterEach(() => {
//     // Очистка фейковых токенов
//     cy.clearCookie('accessToken');
//     localStorage.removeItem('refreshToken');
//   });
// });
