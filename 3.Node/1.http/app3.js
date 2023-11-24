const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req,res)=>{
  try{
  const data = await fs.readFile('./server.html')
  res.writeHead(200,{"Content-Type":"text/html, charset=utf-9"})
  res.end(data);
  } catch(err){
    console.error(err);
    res.writeHead(500, {"Content-Type":"text/plain, charset=utf-9"})
    res.end(err.message)
  }
})

server.listen(3001)