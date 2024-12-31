import { homeApi, HomeResponse } from '..';
import * as Types from './type';

/**
 * 获取用户信息
 */
export const getAuthInfo = (): HomeResponse<Types.AuthInfoEntity> => {
  return homeApi.get('/authority/all');
};

/**
 * 获取用户菜单权限
 */
export const getAuthMenus = (): HomeResponse<Types.AuthMenuEntity[]> => {
  return homeApi.get('/authority/application/menus');
};

/**
 * 获取用户功能权限
 */
export const getAuthResources = (): HomeResponse<Types.AuthResourceEntity[]> => {
  return homeApi.get('/authority/all');
};
