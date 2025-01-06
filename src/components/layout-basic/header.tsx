import { useState, type FC } from 'react';
import {
  Layout,
  message,
  Avatar,
  Button,
  theme,
  Dropdown,
  type MenuProps,
  Space,
  Switch
} from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import useAuthStore from '@/store/auth';
// import config from '@/utils/config';
import { postLogout } from '@/api/auth';
import MyBreadcrumb from '../my-breadcrumb';
import styles from './index.scss';
import { useTranslation } from 'react-i18next';

interface BasicHeaderProps {
  collapsed: boolean;
  onToggle(): void;
}

const BasicHeader: FC<BasicHeaderProps> = (props) => {
  const { collapsed, onToggle } = props;
  const { token } = theme.useToken();
  const { info } = useAuthStore();
  const { i18n, t } = useTranslation();
  const defaultChecked = localStorage.getItem('lang') === 'zh';
  const items: MenuProps['items'] = [
    {
      label: <a onClick={logout}>{t('logout')}</a>,
      key: 'logout',
      danger: true
    }
  ];

  // 退出
  async function logout() {
    const { status, data } = await postLogout();
    if (/^2/.test(status.toString())) {
      message.success(t('logoutSuccess'));
      // const redirect = encodeURIComponent(window.location.href);
    }
  }

  return (
    <Layout.Header className={styles['g-header']} style={{ background: token.colorBgContainer }}>
      <div className="flex items-center" style={{ gap: 8 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
        />
        <MyBreadcrumb />
      </div>
      <Space>
        <Switch
          checkedChildren="zh"
          unCheckedChildren="en"
          defaultChecked={defaultChecked}
          onChange={(value) => {
            i18n.changeLanguage(value ? 'zh' : 'en');
            localStorage.setItem('lang', value ? 'zh' : 'en');
            // window.location.reload();
          }}
        />
        <a
          target="_Blank"
          rel="noopener noreferrer"
          href="https://alidocs.dingtalk.com/iframe/notable?dt_editor_toolbar=true&biz_ver=10&docId=v1GXn49jvr4GqDQ4&from=dingnote&dd_user_keyboard=false&utm_scene=team_space&workspaceId=QqWXwP1yjEM79m31&docKey=v1GXn49jvr4GqDQ4&dentryKey=Rb9yqPOAXHQzo5g9&utm_source=portal&utm_medium=portal_space_file_tree&channelId=wiki-notable-iframe&disableGuide=false&scene=cloudSpace&sheetId=dv19yqvsgs3oebp3pcjys&viewId=sjrkm24v9x6k60z61gm9g&nav=share&mode=form"
        >
          <Button type="primary">{t('feadback')}</Button>
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
