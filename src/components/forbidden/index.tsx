import type { FC } from 'react';
import { Result, Button, message } from 'antd';
import { postLogout } from '@/api/auth';
// import config from 'src/utils/config'

const Forbidden: FC = () => {
  // 退出登录
  const logout = async () => {
    const { status } = await postLogout();
    if (status < 300) {
      message.success('退出成功');
      // const redirect = encodeURIComponent(window.location.href);
      // window.location.href = `${config.url.internal}/login?redirect=${redirect}`;
    }
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有访问权限"
      extra={
        <Button type="primary" onClick={logout}>
          更换登录账号
        </Button>
      }
    />
  );
};

export default Forbidden;
