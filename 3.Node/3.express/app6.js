const express = require('express');
const path = require('path')
const app = express();
const fs = require('fs')
const PORT = 3001;

const users ={}

app.use(express.json())
app.use(express.static('public'))

app.get('/',(req,res)=>{
    const htmlFilePath = path.join(__dirname, 'public', 'index.html')
    console.log(htmlFilePath)
    res.readFile(htmlFilePath, (err)=>{
      if(err){
        console.error('파일 전송 오류',err)
      }
    })
})

app.use((req, res, next) => {
  console.log('Requested URL:', req.url);
  const filePath='.'+req.url
  const data = fs.readFile(filePath);
  res.status(200).type('application/javascript').send(data);
  next();
});




app.listen(PORT,()=>{
  console.log(`http://localhost:${PORT} 에 연결되었습니다.`)
})