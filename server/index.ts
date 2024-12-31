const express = require('express');
const app = express();
const PORT = 3000;
const json = require('./response.ts');

// 定义一个简单的 post 路由
app.post('/home', (req, res) => {
  res.json(json.homeResponse).status(200);
});
// 模拟功能权限
app.get('auth/info', (req, res) => {
  res.json(json.infoResponse).status(200);
});
// 模拟菜单权限
app.get('/authority/application/menus', (req, res) => {
  res.json(json.menusResponse).status(200);
});
// 模拟功能权限
app.get('/authority/all', (req, res) => {
  res.json(json.allResponse).status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
