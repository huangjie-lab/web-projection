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
/**
 * 虽然不知道啥道理
 * 但是的确是解决了t翻译函数传参数问题和i18next引入模块问题
 */
declare module 'i18next' {
  const content: any;
  export default content;
  // interface CustomTypeOptions {
  //   resources: (typeof resources)['en'];
  // }
}
