/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: 'http://localhost:8080/realms/service-app-realm',
    sub: 'test-user-id',
    name: 'Cypress Test User',
    email: 'test@example.com',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const dummyJwt = `${encodedHeader}.${encodedPayload}.fake-signature`;

  cy.window().then((win) => {
    win.localStorage.setItem('access_token', dummyJwt);
    win.localStorage.setItem('id_token', dummyJwt);

    const expiresAt = Date.now() + 3600 * 1000;
    win.localStorage.setItem('expires_at', String(expiresAt));
    win.localStorage.setItem('id_token_claims_obj', JSON.stringify(payload));
    win.localStorage.setItem('id_token_expires_at', String(expiresAt));
    win.localStorage.setItem('id_token_stored_at', String(Date.now()));
  });
});

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('access_token');
    win.localStorage.removeItem('id_token');
    win.localStorage.removeItem('expires_at');
    win.localStorage.removeItem('id_token_claims_obj');
    win.localStorage.removeItem('id_token_expires_at');
    win.localStorage.removeItem('id_token_stored_at');
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

export {};
