declare module '*.scss';
declare module '*.less';
declare interface Window {
  WEB_PRODUCTION: typeof import('./config/production.json').runtime;
}
