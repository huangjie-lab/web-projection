import { homeApi, AuthResponse } from '..';
import * as Types from './type';

/**
 * 获取用户信息
 */
export const getAuthInfo = (): AuthResponse<Types.AuthInfoEntity> => {
  return homeApi.get('/auth/info');
};

/**
 * 获取用户菜单权限
 */
export const getAuthMenus = (): AuthResponse<{
  menu_list: Types.AuthMenuEntity[];
}> => {
  return homeApi.get('/authority/application/menus');
};

/**
 * 获取用户功能权限
 */
export const getAuthResources = (): AuthResponse<{
  resources: Types.AuthResourceEntity[];
}> => {
  return homeApi.get('/authority/all');
};

/**
 * 退出登录
 */
export const postLogout = (): AuthResponse<Types.AuthLogout> => homeApi.post('/auth/logout');
