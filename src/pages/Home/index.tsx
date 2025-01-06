import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.scss';

const Home: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('greeting')}</h1>
      {/* public文件夹的文件直接打包到build文件夹下 可以使用跟路径/来访问 */}
      <img src={'/icon-logo.svg'} width={20} />
      <div className={styles.png}></div>
    </>
  );
};
export default Home;
