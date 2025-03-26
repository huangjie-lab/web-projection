import { useContext, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './index.scss'
import { useThemeConsumer } from '@/utils/themeContext'
// npm link 本地的包
// import { Divider, FishProvider, Button } from 'hug-ui';

const Home: FC = () => {
  const { t } = useTranslation()
  const { theme, setTheme } = useThemeConsumer()
  return (
    <>
      <h1>{t('greeting')}</h1>
      {/* public文件夹的文件直接打包到build文件夹下 可以使用跟路径/来访问 */}
      <img
        src={'/icon-logo.svg'}
        width={20}
        onClick={() => setTheme?.(theme === 'dark' ? 'light' : 'dark')}
      />
      <div className={styles.png}></div>
      <div>{theme}</div>
      {/* <FishProvider>
        <div style={{ margin: '0 100px' }}>
          <div style={{ marginBottom: 10 }}>
            <Divider>child</Divider>
          </div>
          <div style={{ marginBottom: 10 }}>
            <Divider></Divider>
          </div>
          <div style={{ marginBottom: 10 }}>
            <Divider inset></Divider>
          </div>
          <div style={{ marginBottom: 10 }}>
            <Divider
              alignContent="end"
              appearance="brand"
              style={{ width: '500px' }}
              className={styles['custom-styles']}
            >
              测试divider custom styles
            </Divider>
          </div>
        </div>
        <Button label="按钮" primary size="medium" />
        <div className={styles.testBg}></div>
      </FishProvider> */}
      <div className={styles.testBg}></div>
    </>
  )
}
export default Home
