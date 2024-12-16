// import * as order from '../fixtures/newOrder.json';
// import * as mockBun from"../fixtures/mockDataBun.json";
describe('E2E тест конструктора бургеров', () => {
  beforeEach(() => {});
  const testUrl = 'http://localhost:4000';
  const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
  it('добавление булки', () => {
    cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
      fixture: '../fixtures/mockDataBun.json'
    });
    cy.visit(testUrl);
    cy.get("[data-cy='constructor-element-top']").should('not.exist');
    cy.get('[data-cy="burger-ingredient-test1"] button').click();
    cy.get('[data-cy="constructor-element-top"]').should(
      'contain',
      `test (верх)`
    );
  });
  it('работа модального окна', () => {
    cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
      fixture: '../fixtures/mockDataBun.json'
    });
    cy.visit(testUrl);
    cy.get("[data-cy='constructor-element-top']").should('not.exist');
    cy.get(`[data-cy="burger-ingredient-test1"]`).click();
    cy.get('[data-cy="modal"]').within(() => {
      cy.get('[data-cy="modal-title"]').should('contain', 'Детали ингредиента');
      cy.get("[data-cy='modal-body'] h3").should('contain', 'test');
      cy.get("[data-cy='close-modal']").click();
    });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
  it('создание заказа', () => {
    cy.setCookie('accessToken', 'access-token');
    localStorage.setItem('refreshToken', 'refresh-token');
    cy.intercept('GET', 'api/auth/user', {
      fixture: '../fixtures/user.json'
    });
    cy.intercept('POST', 'api/orders', { fixture: '../fixtures/newOrder.json' });
    cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
      fixture: '../fixtures/mockDataBun.json'
    });
    cy.visit(testUrl);
    cy.get("[data-cy='constructor-element-top']").should('not.exist');
    cy.get(`[data-cy="burger-ingredient-test1"] button`).click();
    cy.get('[data-cy="constructor-element-top"]').should(
      'contain',
      `test (верх)`
    );
    cy.get('[data-cy="order-button"]').click();
    cy.get('[data-cy="modal"]').within(() => {
      cy.get("[data-cy='modal-body'] h2").should('contain', 40763);
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
