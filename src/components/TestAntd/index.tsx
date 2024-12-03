import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, version, DatePicker } from 'antd';
import { initialStateProps } from '@/redux/root-reducer';
interface TestAntdProps {
  name: string;
}
const TestAntd: React.FC<TestAntdProps> = ({ name }) => {
  const someData = useSelector((state: initialStateProps<number>) => state.number);
  const dispatch = useDispatch();

  // 使用dispatch触发action
  function handleAction() {
    dispatch({ type: 'ACTION_TYPE' });
  }
  // console.log('redux数据更新时，使用到该数据的组件会重新render');
  return (
    <div>
      <div>{name}</div>
      <div>antd版本{version}</div>
      <div style={{ margin: '10px 0' }}>redux数据更新时，使用到该数据的组件会重新render</div>
      <div style={{ color: 'red', margin: '10px 0' }}>redux中的数据{someData}</div>
      <DatePicker />
      <Button type="primary" onClick={handleAction}>
        按钮
      </Button>
      <Button type="link">link</Button>
    </div>
  );
};
export default TestAntd;
