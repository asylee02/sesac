const express = require('express')
const fs = express('fs')
const path = require('path')
const app = express();
const PORT = 3000;

app.use(express.static('public'))

app.get('/', (req,res)=>{
  res.send(`

  `)
})

app.get('/about', (req,res)=>{
    const htmlFilePath = path.join(__dirname, 'public', 'index.html')
  
    fs.readFile(htmlFilePath, 'utf8', (err,data)=>{
      if(err){
        console.error('파일 읽기 실패', err);
        res.status(500).send('서버 오류');
        return;
      }else{
        res.send(data);
      }
    })
})

app.get('/about2', (req,res)=>{
    const htmlFilePath = path.join(__dirname, 'public', 'index.html')
    res.sendFile(htmlFilePath, (err)=>{
      if(err){
        console.error('파일 전송 오류:',err)
      }
    })
})

app.listen(PORT, ()=>{
  console.log(`http://localhost:${PORT}`)
})