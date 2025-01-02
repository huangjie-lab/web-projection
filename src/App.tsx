import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Provider } from 'react-redux';
import zhCN from 'antd/locale/zh_CN';
// import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import { getStore } from './redux/root-store';
import { useCallback, useEffect, useState } from 'react';
import Loading from './components/loading';
import Forbidden from './components/forbidden';
import LayoutBasic from './components/layout-basic';
import useAuthStore from './store/auth';
import { filterRoutes } from './pages/routes';
import WaterMask from './components/water-mask';
const store = getStore();
// 国际化
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import enTranslation from '@/assets/locales/en';
import zhTranslation from '@/assets/locales/zh';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [hasAuthorized, setHasAuthorized] = useState(true);
  const { fetchAuthInfo, fetchAuthMenus, fetchAuthResources, setRoutes } = useAuthStore();
  const init = useCallback(async () => {
    const info = await fetchAuthInfo();
    if (!info) {
      return;
    }
    const menus = await fetchAuthMenus();
    const resources = await fetchAuthResources();
    const mlen = Object.keys(menus).length;
    const rlen = Object.keys(resources).length;
    if (mlen !== 0) {
      const fiRoutes = filterRoutes(menus, resources);
      setRoutes(fiRoutes);
    }
    setHasAuthorized(mlen !== 0 || rlen !== 0);
    setLoading(false);
  }, [fetchAuthInfo, fetchAuthMenus, fetchAuthResources, setRoutes]);
  useEffect(() => {
    init();
  }, [init]);
  useEffect(() => {
    // 初始化 i18next
    i18next.init({
      interpolation: { escapeValue: false }, // React 已经处理了 XSS
      lng: localStorage.getItem('lang') || 'zh', // 默认语言
      resources: {
        en: { translation: enTranslation },
        zh: { translation: zhTranslation }
      }
    });
  }, [i18next]);
  return (
    <WaterMask>
      <I18nextProvider i18n={i18next}>
        <ConfigProvider locale={zhCN}>
          {loading ? (
            <Loading />
          ) : hasAuthorized ? (
            <Provider store={store}>
              <BrowserRouter>
                <Routes>
                  <Route path="*" element={<LayoutBasic />}></Route>
                </Routes>
              </BrowserRouter>
            </Provider>
          ) : (
            <Forbidden />
          )}
        </ConfigProvider>
      </I18nextProvider>
    </WaterMask>
  );
};
export default App;
