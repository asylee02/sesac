const express = require('express');
const nunjucks = require('nunjucks')
const csv = require('csv-parser')
const fs = require('fs')
const userRouter = require('./src/userRouter')

const app = express();
const port = 3003;

const data = [];



app.set('view engine', 'html');

app.use((req, res, next)=>{
  const start = Date.now();
  
  res.on('finish',()=>{
    const end = Date.now();
    const duration = end - start;
    
    console.log(`요청 ${req.path}에서 응답까지 ${duration}ms이 소요되었습니다.`)
  })
  next();
})

function rend(){
  const itemsPerPage = 10;
  const startIndex=1;
  const endIndex = startIndex+itemsPerPage
  
  let totalPages = Math.ceil(data.length/itemsPerPage)
  
  res.render('index', {title:data[0], data:data.slice(startIndex, endIndex), total: totalPages})
}

app.get('http://127.0.0.1:5500/src/index11.html',(req, res)=>{
  if(data.length ==0){
    files = fs.readFileSync('Person.csv',{encoding: 'utf8'})
    items = files.split('\n')
    items.forEach(item=>{
      mini=[]
      a=item.split(',')
      a.forEach((b)=> { mini.push(b.replace(' ',''))} )
    data.push(mini)
  })
  
  const itemsPerPage = 10;
  const startIndex=1;
  const endIndex = startIndex+itemsPerPage
  
  let totalPages = Math.ceil(data.length/itemsPerPage)
  
  res.render('index', {title:data[0], data:data.slice(startIndex, endIndex), total: totalPages})
}
else{
  
  const itemsPerPage = 10;
  const startIndex=1;
  const endIndex = startIndex+itemsPerPage
  
  let totalPages = Math.ceil(data.length/itemsPerPage)
  
  console.log(totalPages)
  res.render('index', {title:data[0], data:data.slice(startIndex, endIndex), total: totalPages})
  }

})

app.listen(port, ()=>{
  console.log(`서버 http://localhost:${port} 포트 열림`)
})


module.exports= data;