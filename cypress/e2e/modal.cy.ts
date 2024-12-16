import * as order from '../fixtures/newOrder.json';
import * as mockBun from"../fixtures/mockDataBun.json";
describe('E2E тест конструктора бургеров', () => {
  beforeEach(() => {});
  const testUrl = 'http://localhost:4000';
  const BURGER_API_URL="https://norma.nomoreparties.space/api";
  it('добавление булки', () => {
    cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
      // fixture: 'ingredients.json'
      body: {
        success: true,
        data: [mockBun]
      }
    });
    cy.visit(testUrl);
    cy.get("[data-cy='constructor-element-top']").should('not.exist');
    cy.get(`[data-cy="burger-ingredient-${mockBun._id}"] button`).click();
    cy.get('[data-cy="constructor-element-top"]').should(
      'contain',
      `${mockBun.name} (верх)`
    );
  });
  it('работа модального окна', () => {
    cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
      // fixture: 'ingredients.json'
      body: {
        success: true,
        data: [mockBun]
      }
    });
    cy.visit(testUrl);
    cy.get("[data-cy='constructor-element-top']").should('not.exist');
    cy.get(`[data-cy="burger-ingredient-${mockBun._id}"]`).click();
    cy.get('[data-cy="modal"]').within(() => {
      cy.get('[data-cy="modal-title"]').should('contain', 'IngredientDetails');
      cy.get("[data-cy='modal-body'] h3").should('contain', mockBun.name);
      cy.get("[data-cy='close-modal']").click();
    });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
  it('создание заказа', () => {
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
    cy.intercept('POST', 'api/orders', { body: { ...order } });
    cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
      // fixture: 'ingredients.json'
      body: {
        success: true,
        data: [mockBun]
      }
    });
    cy.visit(testUrl);
    cy.get("[data-cy='constructor-element-top']").should('not.exist');
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
