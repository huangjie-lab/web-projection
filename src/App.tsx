import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Provider } from 'react-redux';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import { getStore } from './redux/root-store';
import { useCallback, useEffect, useState } from 'react';
import Loading from './components/loading';
import Forbidden from './components/forbidden';
import LayoutBasic from './components/layout-basic';
import useAuthStore from './store/auth';
const store = getStore();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [hasAuthorized, setHasAuthorized] = useState(true);
  const { fetchAuthInfo, fetchAuthMenus, fetchAuthResources } = useAuthStore();
  const init = useCallback(async () => {
    const info = await fetchAuthInfo();
    if (!info) {
      return;
    }
    const menus = await fetchAuthMenus();
    const resources = await fetchAuthResources();
    const mlen = Object.keys(menus).length;
    const rlen = Object.keys(resources).length;
    setHasAuthorized(mlen !== 0 || rlen !== 0);
    setLoading(false);
  }, [fetchAuthInfo, fetchAuthMenus, fetchAuthResources]);
  useEffect(() => {
    init();
  }, [init]);
  return (
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
  );
};
export default App;
