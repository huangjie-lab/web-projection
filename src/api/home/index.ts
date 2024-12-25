import { homeApi, HomeResponse } from '..';
import * as Types from './type';

// 拿到接口返回的res就有ts类型提示了
export const getHome = (params: Types.IHomeParams): HomeResponse<Types.IHomeRes[]> => {
  return homeApi.post('/home', { params });
};
