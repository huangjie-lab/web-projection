import { useState } from 'react';
import routes from './routes';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useNavigate, useRoutes } from 'react-router-dom';
import '@/common/common.scss';
const { Header, Content, Sider } = Layout;
const titleMenu: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `标题 ${key}`
}));

const siderMenu: MenuProps['items'] = [
  {
    key: 'home',
    icon: <UserOutlined />,
    label: 'home组件'
  },
  {
    key: 'about',
    icon: <NotificationOutlined />,
    label: 'about组件'
  },
  {
    key: 'info',
    icon: <LaptopOutlined />,
    label: '信息管理',
    children: [
      {
        key: 'info-detail',
        label: '信息详情'
      },
      {
        key: 'info-look',
        label: '信息查询'
      }
    ]
  },
  {
    key: 'redux',
    icon: <NotificationOutlined />,
    label: 'redux组件'
  }
];
const App = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  // 获得路由表
  const routeView = useRoutes(routes);
  const navigate = useNavigate();
  // 面包屑名称
  const [breadcrumbName, setBreadcrumbName] = useState('home');
  // 点击菜单
  const handleSiderClick: MenuProps['onClick'] = ({ key, keyPath }) => {
    const name = keyPath.reverse().join('/') || '';
    setBreadcrumbName(name);
    // 路由跳转
    navigate(key, {
      replace: false,
      state: {
        id: key
      }
    });
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={titleMenu} />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['info-look']}
            defaultOpenKeys={['info']}
            style={{ height: '100%', borderRight: 0 }}
            items={siderMenu}
            onClick={handleSiderClick}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <div style={{ margin: '16px 0' }}>{breadcrumbName}</div>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            {routeView || breadcrumbName}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
