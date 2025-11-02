export const environment = {
  production: false,
  apiUrl: 'http://localhost:8090/api',
  apiPaths: {
    memberRequest: '/v1/member-request',
    members: '/v1/members',
    prices: '/v1/prices',
  },
  auth: {
    domain: 'domain',
    clientId: 'clientId'
  },
  routes: {
    landing: 'landing',
    login: 'login',
    management: 'management'
  }
};
