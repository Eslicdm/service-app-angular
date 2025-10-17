import {environment} from 'environment';

describe('Member Page', () => {
  beforeEach(() => {
    cy.login();

    cy.intercept('GET', `**/api${environment.apiPaths.members}`, {
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
