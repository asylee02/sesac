const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
  // 뷰 엔진을 통해서 렌더링을 해주어야함
  // 렌더링 (rendering) = 컨텐츠를 삽입/ 변경해주는 과정
  res.render('index', {title: 'Express앱', message:'EJS를 처음 사용해 보는 것'})
})

app.get('/greeting', (req,res)=>{
  const username = '이상연';

  res.render('greeting',{username: username});
})

app.get('/welcome',(req, res)=>{
  const isAdmin = false;
  res.render('welcome', {isAdmin})
})

app.get('/fruits',(req,res)=>{
  const fruits = ['Apple','Banana','Orange','Grpaes'];
  res.render('fruits',{fruits})
})

app.get('/page', (req, res)=>{
  const data = {
    title: '마이 페이지',
    content : "여기에 본문에 들어갈 내용을 작성하시오..."
  };
  res.render('main', data)
})

app.listen(port, ()=>{
  console.log(`서버 http://localhost:${3000} 포트 열림`)
})