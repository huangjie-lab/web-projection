import React from 'react';
import './App.scss';
import EslintCom from '@/components/EslintCom';
import PrettierCom from '@/components/PrettierCom';

function App() {
  return (
    <div className="App">
      <div className="test">12</div>
      <EslintCom />
      <PrettierCom />
    </div>
  );
}
export default App;
