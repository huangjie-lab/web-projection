import React from 'react';
import styles from './index.scss';

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.home}>home page</div>
      <div className={styles['css-module']}>TEST CSS MODULE -- WEBPACK CONFIG</div>
    </>
  );
};
export default Home;
