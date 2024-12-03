import React from 'react';
import { Button, version, DatePicker } from 'antd';
interface TestAntdProps {
  name: string;
}

const TestAntd: React.FC<TestAntdProps> = ({ name }) => {
  return (
    <div>
      <div>{name}</div>
      <div>antd版本{version}</div>
      <DatePicker />
      <Button type="primary">按钮</Button>
      <Button type="link">link</Button>
    </div>
  );
};
export default TestAntd;
