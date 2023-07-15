describe('Login Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.fixture('login.json').then((loginData) => {
      cy.login(loginData.email, loginData.password);
    });
  });
  
  it('should log in successfully and redirect to the dashboard', () => {
    cy.url().should('include', '/');
  });
});