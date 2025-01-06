import { type FC, useEffect, useMemo, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router';
import useAuthStore from '@/store/auth';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { getBreadcrumbMap, pathToList } from './utils';

const MyBreadcrumb: FC = () => {
  const { routes } = useAuthStore();
  const [items, setItems] = useState<ItemType[]>([]);
  const location = useLocation();
  const breadcrumbMap = useMemo(() => getBreadcrumbMap(routes), [routes]);

  useEffect(() => {
    const paths = pathToList(location.pathname);
    const list = paths.map((el) => {
      // const current = breadcrumbMap.get(el);
      const current = breadcrumbMap[el];
      return {
        title: current?.title,
        path: current?.path,
        isLink: !!current?.element
      };
    });
    setItems(list);
  }, [breadcrumbMap, location.pathname, routes]);

  const itemRender = (current: any, _: any, items: ItemType[]) => {
    const isLast = current?.path === items[items.length - 1]?.path;

    return isLast || !current.isLink ? (
      <span>{current.title}</span>
    ) : (
      <Link to={current?.path}>{current.title}</Link>
    );
  };

  return <Breadcrumb items={items} itemRender={itemRender}></Breadcrumb>;
};

export default MyBreadcrumb;
