import React from 'react';
import styles from './index.scss';
import { Button } from 'antd';
import { getHome } from '@/api/home';

const Home: React.FC = () => {
  const testAxios = async () => {
    const res = await getHome({ id: 1 });
  };
  return (
    <>
      <div className={styles.home}>home page</div>
      <div className={styles['css-module']}>TEST CSS MODULE -- WEBPACK CONFIG</div>
      <Button onClick={testAxios}>点击掉接口</Button>
      <div className={styles.count}>home count</div>
    </>
  );
};
export default Home;
