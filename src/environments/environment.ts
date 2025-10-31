export const environment = {
  production: false,
  apiUrl: 'http://localhost:8090/api',
  apiPaths: {
    memberRequest: '/v1/member-request',
    members: '/v1/members/1',
    prices: '/v1/prices',
  },
  auth: {
    domain: 'domain',
    clientId: 'clientId'
  },
  routes: {
    landing: 'landing',
    member: 'member',
    pricing: 'pricing',
    login: 'login'
  }
};
