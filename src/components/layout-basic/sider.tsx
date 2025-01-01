import { useState, useEffect, type FC } from 'react';
import { Layout, Menu } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { Link } from 'react-router';
import styles from './index.scss';
import IconLogo from '@/assets/images/icon-logo.svg';
import { MainRouteProps, routes } from '@/pages/routes';
import useMenus from '@/hooks/use-menus';

type BasicSiderProps = {
  collapsed: boolean;
};

/**
 * 遍历路由转换成菜单
 *
 * @param {MainRouteProps[]} routes - 路由配置
 * @returns
 */
const transformMenu = (routes: MainRouteProps[]) => {
  const transformItem = (item: MainRouteProps) => {
    if (item.path === '*' || item.hideInMenu) {
      return false;
    }
    const el: any = {
      key: item.path,
      icon: item.icon,
      label: item.title
    };

    if (item.children) {
      el.children = item.children.map(transformItem);
    } else if (item.path) {
      el.label = item.path.startsWith('http') ? (
        <a href={item.path} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      ) : (
        <Link to={item.path}>{item.title}</Link>
      );
    }

    return el;
  };

  return routes.map(transformItem).filter(Boolean);
};

/**
 * 侧边栏
 */
const BasicSider: FC<BasicSiderProps> = ({ collapsed }) => {
  const [menus, setMenus] = useState<ItemType[]>([]);
  const { openKeys, selectedKeys, onOpenChange } = useMenus();
  useEffect(() => {
    const list = transformMenu(routes);
    setMenus(list);
  }, [routes]);

  return (
    <Layout.Sider className={styles['g-sider']} collapsible trigger={null} collapsed={collapsed}>
      <div className={styles['sider-menu']}>
        <div className={styles.brand}>
          <img src={IconLogo} className={styles.icon} />
          <h1 style={{ display: collapsed ? 'none' : 'block', whiteSpace: 'nowrap' }}>后台系统</h1>
        </div>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={onOpenChange}
          items={menus}
        />
      </div>
    </Layout.Sider>
  );
};

export default BasicSider;
