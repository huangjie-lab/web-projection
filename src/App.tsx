import React from 'react';
import './App.scss';
import EslintCom from '@/components/EslintCom';
import PrettierCom from '@/components/PrettierCom';
import { Button } from 'antd';
import 'antd/dist/reset.css';

function App() {
  return (
    <div className="App">
      <EslintCom />
      <PrettierCom />
      <Button type="primary">按钮</Button>
      <Button type="link">link</Button>
    </div>
  );
}
export default App;
