const express = require('express');

const app = express()
const PORT = 3000;

app.get('/', (req, res)=>{
  res.send('Hello')
})

app.post('/', (req, res)=>{
  res.send('Hello, Post')
})

app.put('/', (req, res)=>{
  res.send('Hello PUT')
})

app.delete('/', ()=>{
  res.send('DELETE')
})

app.listen(PORT, ()=>{
  console.log(`서버가 http://localhost:${PORT} 에서 열렸습니다`)
})