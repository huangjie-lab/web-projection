import { RouteObject } from 'react-router-dom';
import {
  ContactsOutlined,
  DesktopOutlined,
  HomeOutlined,
  LinkOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import Loading from '@/components/loading';
import { ComponentType, lazy, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';

/**
 * 菜单属性
 */
type MenuProps = {
  /** 菜单名称 */
  title?: string;
  /** 图标 */
  icon?: ReactNode;
  /** 权限Code */
  code?: string;
  /** 菜单中隐藏 */
  hideInMenu?: boolean;
  /** 子菜单 */
  children?: MenuProps[];
  exact?: boolean;
};

/**
 * 路由菜单属性
 */
export type MainRouteProps = RouteObject & MenuProps;

/**
 * 懒加载
 */
const lazyLoad = (dynamicImport: () => Promise<{ default: ComponentType<any> }>) => {
  const Component = lazy(dynamicImport);
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading delay={500} />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};

/**
 * 根据权限过滤路由
 *
 * @export
 * @param {Record<string, boolean>} menus - 菜单权限
 * @param {Record<string, boolean>} resources - 功能权限
 * @returns
 */
export const filterRoutes = (
  menus: Record<string, boolean>,
  resources: Record<string, boolean>
) => {
  // 检查用户是否有权限访问指定的菜单
  const hasAuthorized = (el: MainRouteProps) => {
    // return !el.code || menus[el.code] || resources[el.code];
    return !el.code || menus[el.code];
  };
  // 过滤子菜单
  const filterChildren = (child: MainRouteProps) => {
    if (child.children) {
      child.children = child.children.filter(filterChildren);
    }
    return hasAuthorized(child);
  };
  return routes.filter((el: MainRouteProps) => {
    const isAuthorized = hasAuthorized(el);
    if (isAuthorized) {
      filterChildren(el);
    }
    return isAuthorized;
  });
};
/**
 * 全部路由配置，菜单会根据此路由自动生成
 */
export const routes: MainRouteProps[] = [
  {
    path: '/',
    title: '首页',
    exact: true,
    icon: <HomeOutlined />,
    element: lazyLoad(() => import('./home'))
  },
  {
    path: '/workbar',
    title: '工作台',
    exact: true,
    icon: <DesktopOutlined />,
    element: lazyLoad(() => import('./workbar')),
    code: 'skWorkbar'
  },
  {
    path: '/handover-manage',
    title: '交接管理',
    code: 'handoverManage',
    icon: <ContactsOutlined />,
    children: [
      {
        path: '/handover-manage/sclass-handover-pool',
        title: '小班交接池',
        element: lazyLoad(() => import('./sclass_handover_pool'))
      } as MainRouteProps
    ]
  },
  {
    path: '/redux',
    element: lazyLoad(() => import('./testRedux')),
    exact: true,
    title: '测试redux',
    hideInMenu: true,
    icon: <UnorderedListOutlined />
  },
  {
    path: 'https://codemao.cn/',
    title: '外链菜单',
    icon: <LinkOutlined />,
    code: 'orderManagement'
  },
  {
    path: '*',
    element: lazyLoad(() => import('@/components/not-found'))
  }
];
