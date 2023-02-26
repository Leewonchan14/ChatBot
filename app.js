const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // 포트 번호

// 메인 페이지 라우팅
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 실행
app.listen(port, function() {
  console.log(`Server running at http://localhost:${port}`);
});
