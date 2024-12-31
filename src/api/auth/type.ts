/**
 * 用户信息
 */
export type AuthInfoEntity = {
  id: number;
  fullname: string;
  email: string;
  phone_number: string;
};

/**
 * 权限菜单
 */
export type AuthMenuEntity = {
  menu_id: number;
  menu_name: string;
  menu_code: string;
  order_number: 0;
  parent_id: number;
};

/**
 * 权限功能
 */
export type AuthResourceEntity = {
  resourceId: number;
  resource_name: string;
  resource_code: string;
  resource_url: string;
  description: string;
  status: 'YES' | 'NO';
};
