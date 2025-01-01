/**
 * 使用zustand来对菜单权限，功能权限进行管理
 */
import { create } from 'zustand';
import { getAuthInfo, getAuthMenus, getAuthResources } from '@/api/auth';
import type { MainRouteProps } from '@/pages/routes';
import { AuthInfoEntity } from '@/api/auth/type';

type AuthState = {
  /** 基础信息 */
  info: AuthInfoEntity | null;
  /** 菜单权限 */
  menus: Record<string, boolean>;
  /** 功能权限 */
  resources: Record<string, boolean>;
  /** 根据权限过虑后的路由配置列表 */
  routes: MainRouteProps[];
  /** 设置路由配置 */
  setRoutes: (value: MainRouteProps[]) => void;
  /** 拉取用户信息 */
  fetchAuthInfo: () => Promise<AuthInfoEntity | null>;
  /** 拉取用户菜单权限 */
  fetchAuthMenus: () => Promise<Record<string, boolean>>;
  /** 拉取用户功能权限 */
  fetchAuthResources: () => Promise<Record<string, boolean>>;
};

/**
 * 用户store
 */
const useAuthStore = create<AuthState>()((set) => ({
  info: null,
  menus: {},
  resources: {},
  routes: [],
  setRoutes: (value: MainRouteProps[]) => {
    set({ routes: value });
  },
  fetchAuthInfo: async () => {
    const { status, data } = await getAuthInfo();
    if (status === 200) {
      set({ info: data });
      return data;
    }
    return null;
  },
  fetchAuthMenus: async () => {
    const { status, data } = await getAuthMenus();
    if (status === 200) {
      const map: Record<string, boolean> = {};
      data.menu_list.forEach((el) => {
        map[el.menu_code] = true;
      });

      set({ menus: map });
      return map;
    }
    return {};
  },
  fetchAuthResources: async () => {
    const { status, data } = await getAuthResources();
    if (status === 200) {
      const map: Record<string, boolean> = {};
      data.resources.forEach((el) => {
        map[el.resource_code] = true;
      });
      set({ resources: map });
      return map;
    }
    return {};
  }
}));

export default useAuthStore;
