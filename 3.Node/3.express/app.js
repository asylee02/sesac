const express = require('express')

const app = express();

const PORT = 3000;

function myLogger(req,res,next){
  const time = Dae.now();
  req.requstionTime - new Date(Date.now())
  console.log('LOG MESSAGE');
  next()
}

function reqest

// 2. 미들웨어
app.use(myLogger);


//1. 라우팅 루트 경로 생성
app.get('/',(req, res)=>{
    res.send('Hello, World')
});


app.listen(PORT, ()=>{
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`)
})

