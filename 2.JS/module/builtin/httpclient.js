const http = require('http');

const options ={
  hostname: 'https://www.naver.com/',
  port: 80,
  path: "/",
  method: 'GET'
}

const req = http.request(options,(res)=>{
  console.log(`상태 코드: $(res.statusCode)`);
  res.on('data', (chunk)=>{
    console.log(`데이터 수신: ${chunk}`)
  })
})

req.on('error',(error)=>{
  console.log(error);
})