const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // 포트 번호

// 정적 파일 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 메인 페이지 라우팅
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 실행
app.listen(port, function() {
  console.log(`Server running at http://localhost:${port}`);
});