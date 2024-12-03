import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, version, DatePicker } from 'antd';
//导入 状态管理库的修改方法
import { setUserInfo, setUserPwd, update } from '@/redux/user';
import { update as updateCount, increment } from '@/redux/count';
interface TestAntdProps {
  name: string;
}
const TestAntd: React.FC<TestAntdProps> = ({ name }) => {
  const dispatch = useDispatch();
  //获取数据
  const { password, username, age } = useSelector((store) => (store as any).user);
  const { count } = useSelector((store) => (store as any).count);

  // console.log('redux数据更新时，使用到该数据的组件会重新render');
  //派发 提交修改
  const handleAction = () => {
    // dispatch(update({ username: 'dddd', age: 2 }));
    dispatch(setUserPwd('new password'));
  };
  const handleSagaAction = () => {
    dispatch(
      setUserInfo({
        username: '玩儿码字',
        age: 99,
        // 传递一个回调
        cb: (obj: any) => {
          console.log(obj);
        }
      })
    );
    dispatch(setUserPwd('new saga password'));
  };
  const handleSyncAction = () => {
    dispatch(updateCount(Math.random()));
  };
  const handleAsyncAction = () => {
    dispatch(increment(10));
  };
  return (
    <div>
      <div>{name}</div>
      <div>antd版本{version}</div>
      <div style={{ margin: '10px 0' }}>redux数据更新时，使用到该数据的组件会重新render</div>
      <div style={{ color: 'red', margin: '10px 0' }}>redux中的数据：密码{password}</div>
      <div style={{ color: 'red', margin: '10px 0' }}>
        redux中的数据：个人信息{username}-{age}
      </div>
      <DatePicker />
      <Button type="primary" onClick={handleAction}>
        触发 action
      </Button>
      <Button type="primary" onClick={handleSagaAction}>
        触发saga action
      </Button>
      <Button type="link">link</Button>
      <div>antd版本{version}</div>
      <div style={{ color: 'red', margin: '10px 0' }}>count模块{count}</div>
      <Button type="primary" onClick={handleSyncAction}>
        触发同步action(无需saga且验证模块性)
      </Button>
      <Button type="primary" onClick={handleAsyncAction}>
        模拟异步action
      </Button>
    </div>
  );
};
export default TestAntd;
