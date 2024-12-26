import { Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import TestRedux from '@/components/TestRedux';

interface JsxElement {
  path: string;
  element: JSX.Element;
}
export default [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/redux',
    element: <TestRedux name="测试redux" />
  },
  {
    path: '/',
    element: <Navigate to="/home" />
  }
] as JsxElement[];
