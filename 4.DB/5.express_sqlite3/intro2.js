const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs')

const app =express();
const port = 3000;
const dbFile = 'mydb1.db';

const db = new sqlite3.Database(dbFile);

//DB 초기화 함수
function init_database(){
  return new Promise((resolve,reject)=>{
    const sql = fs.readFileSync('init_database.sql','utf-8');
    db.exec(sql, (err)=>{
      if(err){
        if(err.code == 'SQLITE_CONSTRAINT'){
          console.log('초기화 이미 되어있음');
          resolve();
        }
        else{
          console.error('초기화 실패',err);
          reject();
        }
      }else{
        console.log('초기화 성공')
        resolve();
      }
    })
  })
}

// init_database();

app.get('/:table',(req,res)=>{
  //DB 로부터 특정 테이블을 조회하는 코드 작성
  const db_table = req.params.table;

  const query = `SELECT * FROM ${db_table}`

  db.all(query, (err,rows)=>{
    res.json(rows)
  })
});

app.get('/:table/:id',(req,res)=>{
    const db_table = req.params.table;
    const id = req.params.id;

    const query = `SELECT * FROM ${db_table} WHERE userid=${id}`

   db.all(query, (err,rows)=>{
    res.json(rows)
  })
})

async function startServer(){
  try{
    await init_database();
    app.listen(port,()=>{
      console.log(`http://localhost${port} 로 열림`)
    })
  }
  catch(err){
    console.log(err);
  }
}

startServer();