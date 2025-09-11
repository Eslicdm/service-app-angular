describe('Authentication Flows', () => {
  it('should redirect an unauthenticated user to the login page', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.contains('p', 'Login');
    cy.get('[data-testid="login-button"]').should('be.visible');
  });

  it('should log the user out and redirect to the login page', () => {
    cy.login();

    cy.visit('/');
    cy.contains('p', 'Member').should('be.visible');

    cy.logout();

    cy.visit('/');
    cy.url().should('include', '/login');
    cy.get('[data-testid="login-button"]').should('be.visible');
  });
});
