export const environment = {
  production: false,
  apiUrl: 'http://localhost:8090/api',
  apiPaths: {
    members: '/v1/members/1',
    prices: '/v1/prices',
  },
  keycloak: {
    issuer: 'http://localhost:8080/realms/service-app-realm',
    clientId: 'service-app-angular',
  },
  routes: {
    landing: 'landing',
    member: 'member',
    pricing: 'pricing',
    memberLogin: 'member-login',
    pricingLogin: 'pricing-login',
  }
};
