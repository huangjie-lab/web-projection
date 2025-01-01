declare module '*.scss';
declare module '*.less';
declare interface Window {
  WEB_PRODUCTION: typeof import('./config/production.json').runtime;
}
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
