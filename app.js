const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000; // 포트 번호
var text = 'asdff';

var script = `<script type="module">
import { Configuration, OpenAIApi } from 'https://cdn.skypack.dev/openai';
//엔터 리스너 달기
document.getElementById("input").addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // 폼 제출 방지
    myFunction();
  }
});
//클릭 리스너 달기
document.querySelector('#send').addEventListener('click',function(){
  myFunction();
})
function myFunction() {
  //적은 내용 가져오기
  var InputBox = document.querySelector('#input');
  var myChatText = InputBox.value;
  //만약 아무것도 안적었다면 동작하기 않기
  if(myChatText == '') return;
  //내 채팅, 봇 채팅 엘리멘트 템플릿 두개 만들기
  var template = {
    mine : function(text){
      return \`<p class="line"><span class="chat mine">\${text}</span></p>\`;
    },
    bot: function(text){
      return \`<p class="line"><span class="chat">\${text}</span></p>\`;
    }
  };
  //채팅창 가져오기
  var ChatBox = document.querySelector('.content_box');
  //채팅창에 내가 말한거 추가
  ChatBox.insertAdjacentHTML('beforeend',template.mine(myChatText));
  //입력창 초기화
  InputBox.value = '';
  //api로 답변듣기
  const configuration = new Configuration({
    apiKey: '${process.env.app}',
  });
  const openai = new OpenAIApi(configuration);

  openai.createCompletion({
    model: "text-davinci-003",
    prompt: \`\${myChatText}\`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  .then((result)=>{
    //답변 가져오기
    var chat = result.data.choices[0].text;
    //가져온 답변 채팅창에 띄우기
    ChatBox.insertAdjacentHTML('beforeend',template.bot(chat));
  });
}
</script>`

// 메인 페이지 라우팅
app.get('/', function(req, res) {
  var data = fs.readFileSync(path.join(__dirname, 'index.html'),'utf8')
  res.send(data+script);
});

// 서버 실행
app.listen(port, function() {
  console.log(`Server running at http://localhost:${port}`);
});
