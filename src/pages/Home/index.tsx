import React from 'react';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { IReduxState } from '@/redux/root-reducer';

const Home: React.FC = () => {
  const { count } = useSelector((store: IReduxState) => store.count);
  const { username } = useSelector((store: IReduxState) => store.user);

  return (
    <>
      <div className={styles.count}>{username}</div>
      {/* <div className={'title'}>{username}</div> */}
    </>
  );
};
export default Home;
