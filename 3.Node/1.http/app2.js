const http = require('http');

http.createServer((req,res)=>{
  res.writeHead(200, {'Content-type':'text/html'});
  res.write('<H1>Hello Node Server</H1>')
  res.end('<P1>Hello Server1</P1>')
}).listen(8001,()=>{
  console.log('server open')
  console.log('http://localhost:8001')
})