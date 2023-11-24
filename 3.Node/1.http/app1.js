const http = require('http');

const server = http.createServer((req,res)=>{
  res.writeHead(200, {'Content-Type':'text/HTMLAllCollection; charset=utf-8'})
  res.write('<H1>나의 첫번쨰 WAS 서버</H1>')
  res.end('<P>안녕하세요!</P>')
})

server.listen(3000,()=>{
  console.log('서버가 3000번 포트에 잘 열려있습니다. 서버가 준비되었습니다.')
})