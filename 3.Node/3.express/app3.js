const express = require('express');

const app = express()
const PORT = 3000;

app.get('/', (req, res)=>{
  res.send('Hello')
})

app.use(express.static('public'));

app.get('/user/:id', (req, res)=>{
  const uid = req.params.id;
  res.send(`Hello ${uid}`)
})

app.get('/user/:id/profile', (req, res)=>{
  const uid = req.params.id;
  res.send(`<H1>Hello ${uid}님의 프로파일</H1>
            <img src="/images/white2.jpg">
  `)
})

app.use((req,res)=>{
  res.status(404).send(`<H1>페이지를 찾을 수 없습니다.</H1>`)
})

app.get('/search', (req,res)=>{
  const keyword = req.query.keyword; // GET 파라미턴는 req.query를 통해서 전달 받음
  res.send(`입력한 키워드는 : ${keyword}입니다.`)
})

app.get('/shopping', (req,res)=>{
  const cat = req.query.category;
  const item = req.query.item
  res.send(`입력하신 키워드는: ${cat} 에 ${item}입니다.`)
})



app.listen(PORT, ()=>{
  console.log(`서버가 http://localhost:${PORT} 에서 열렸습니다`)
})