describe('Member Page', () => {
  beforeEach(() => {
    cy.login();

    cy.intercept('GET', '**/api/v1/members/1', {
      fixture: 'members.json',
    }).as('getMembers');

    cy.visit('/');
  });

  it('should display the member content and member list for an authenticated user', () => {
    cy.url().should('not.include', '/login');
    cy.contains('p', 'Member');

    cy.wait('@getMembers');

    cy.get('mat-card-title').should('contain.text', 'Cypress Test User');
  });
});
