import { type FC, useState } from 'react';
import { Layout, theme } from 'antd';
import { useRoutes } from 'react-router';
import styles from './index.scss';
import BasicSider from './sider';
import BasicHeader from './header';
import { routes } from '@/pages/routes';

const LayoutBasic: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const { routes } = useAuthStore();
  const element = useRoutes(routes);
  const { token } = theme.useToken();

  const onToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className={styles['g-layout']} hasSider>
      <BasicSider collapsed={collapsed} />
      <Layout className={styles.container} style={{ marginInlineStart: collapsed ? 80 : 200 }}>
        <BasicHeader collapsed={collapsed} onToggle={onToggle} />
        <Layout.Content
          style={{
            margin: 14,
            padding: 0,
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG
          }}
        >
          {element}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
export default LayoutBasic;
