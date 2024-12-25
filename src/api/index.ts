import axios, { AxiosResponse } from 'axios';

// 定义接口返回失败参数类型
interface ErrorResponse {
  error_code: string;
  error_message: string;
}

// 定义接口返回成功参数类型
interface AxiosHomeResponse<T = any> {
  data: T;
  stateCode?: {
    code?: string;
    desc?: string;
  };
  statusText?: string;
  success?: boolean;
}
export type BaseResponse<T> = Promise<AxiosResponse<T>>;

// 封装接口返回参数类型
export type HomeResponse<T> = BaseResponse<AxiosHomeResponse<T> & ErrorResponse>;
/**
 * 设置全局配置
 */
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = (status: number) => {
  return status >= 200 && status < 599;
};

export const createAxios = (baseURL: string) => {
  const instance = axios.create({ baseURL });
  instance.interceptors.request.use(
    (config) => {
      if (config.method?.toLocaleLowerCase() === 'get') {
        config.params = { ...config.params, _: Date.now() };
      }
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      // 对响应数据做点什么
      switch (response.status) {
        case 401:
          break;
      }
      return response;
    },
    (error) => {
      // 对响应错误做点什么
      // if (error.response && error.response.data) {
      // }
      return Promise.reject(error);
    }
  );
  return instance;
};

// test接口
/**
 * url: http://localhost:3001/api
 * 不同环境的url可以抽离到config下的配置文件 todo...
 */
export const homeApi = createAxios('http://localhost:3001/api');
