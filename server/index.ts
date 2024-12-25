const express = require('express');
const app = express();
const PORT = 3000;

// 定义一个简单的 post 路由
app.post('/home', (req, res) => {
  const response = {
    data: [
      {
        id: 1,
        msg: 'Hello, home page1'
      },
      {
        id: 2,
        msg: 'Hello, home page2'
      }
    ],
    stateCode: {
      code: 200,
      desc: '成功'
    },
    success: true,
    statusText: '成功'
  };
  res.json(response).status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
