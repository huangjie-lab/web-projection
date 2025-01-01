import type { FC } from 'react';
import { Layout, message, Avatar, Button, theme, Dropdown, type MenuProps, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import useAuthStore from '@/store/auth';
// import config from 'src/utils/config'
// import { postLogout } from 'src/api/auth'
// import MyBreadcrumb from '../my-breadcrumb'
import styles from './index.scss';

interface BasicHeaderProps {
  collapsed: boolean;
  onToggle(): void;
}

const BasicHeader: FC<BasicHeaderProps> = (props) => {
  const { collapsed, onToggle } = props;
  const { token } = theme.useToken();
  const { info } = useAuthStore();
  console.log(info, 'info');

  const items: MenuProps['items'] = [
    {
      label: <a onClick={logout}>退出登录</a>,
      key: 'logout',
      danger: true
    }
  ];

  // 退出
  async function logout() {
    // const { status } = await postLogout()
    // if (status < 300) {
    //   message.success('退出成功')
    //   const redirect = encodeURIComponent(window.location.href)
    //   window.location.href = `${config.url.internal}/login?redirect=${redirect}`
    // }
  }

  return (
    <Layout.Header className={styles['g-header']} style={{ background: token.colorBgContainer }}>
      <div className="flex items-center" style={{ gap: 8 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
        />
        {/* <MyBreadcrumb /> */}
      </div>
      <Space>
        <a
          target="_Blank"
          rel="noopener noreferrer"
          href="https://bigdata-superset.codemao.cn/dashboard/list"
        >
          <Button type="primary">superset数据看板</Button>
        </a>
        <a
          target="_Blank"
          rel="noopener noreferrer"
          href="https://alidocs.dingtalk.com/iframe/notable?dt_editor_toolbar=true&biz_ver=10&docId=v1GXn49jvr4GqDQ4&from=dingnote&dd_user_keyboard=false&utm_scene=team_space&workspaceId=QqWXwP1yjEM79m31&docKey=v1GXn49jvr4GqDQ4&dentryKey=Rb9yqPOAXHQzo5g9&utm_source=portal&utm_medium=portal_space_file_tree&channelId=wiki-notable-iframe&disableGuide=false&scene=cloudSpace&sheetId=dv19yqvsgs3oebp3pcjys&viewId=sjrkm24v9x6k60z61gm9g&nav=share&mode=form"
        >
          <Button type="primary">意见反馈</Button>
        </a>
        <Dropdown menu={{ items }} trigger={['click']}>
          <Button type="text" style={{ height: 'auto', padding: 8 }}>
            <Avatar style={{ display: 'flex' }}>{info?.email?.charAt(0).toUpperCase()}</Avatar>
            <span>{info?.fullname}</span>
          </Button>
        </Dropdown>
      </Space>
    </Layout.Header>
  );
};

export default BasicHeader;
