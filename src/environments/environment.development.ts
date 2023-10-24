declare const require: any;

export const environment = {
  production: false,
  appCode: 'fr-be',
  isMock: false,
  mockUrl: 'http://127.0.0.1:4200/assets/mockdata/',
  apiUrl: 'http://127.0.0.1:8080/api/',
  appUrl: 'http://127.0.0.1:4200/',
  package: require('../../package.json'),
  googleBrowserKey: '',
};
