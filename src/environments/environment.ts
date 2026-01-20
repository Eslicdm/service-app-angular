export const environment = {
  production: false,
  apiUrl: 'http://localhost:8090/api',
  apiPaths: {
    memberRequest: '/v1/member-request',
    members: '/v1/members',
    prices: '/v1/prices',
  },
  auth: {
    issuer: 'http://keycloak:8080/realms/service-app-realm',
    clientId: 'service-app-angular'
  },
  routes: {
    landing: 'landing',
    management: 'management'
  }
};
