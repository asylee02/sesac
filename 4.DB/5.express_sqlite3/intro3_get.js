const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs')

const app =express();
const port = 3000;
const dbFile = 'mydb1.db';

const db = new sqlite3.Database(dbFile);

app.use(express.json()) // body 안에 있는 json 형식을 찾아서 파싱해서 req.body에 넣어주기
app.use(express.urlencoded({extended:true})) // -d로 오는 key,value 에 대해서 파싱을 해서 req.body에 넣어줌 

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
app.get('/users',(req,res)=>{
  // const username = req.query.username;
  const {username} = req.query;
  let query;
  if(username){
    query = `SELECT * FROM users WHERE username= LIKE '%${username}%'`
    console.log(query);
  }else{
    //DB 로부터 특정 테이블을 조회하는 코드 작성
    query = `SELECT * FROM users`
        }
    db.all(query, (err,rows)=>{
      res.json(rows)
    })
});


app.post('/users', (req,res)=>{
  //입력받은 사용자를 DB에 추가하시오
  const {username, password} = req.body;

  const query = 'INSERT INTO users (username, password) VALUES (?,?)'
  db.run(query, [username, password], function(err){
    if(err){
      console.error(err.message);
      res.status(500).send('내부 오류로 인해 사용자를 생성할 수 없습니다.')
      return
    }
  })

  console.log(username,password)
  res.send('생성 완료')
})

app.put('/users/:id',(req,res)=>{
  //입력받은 사용자의 정보를 DB에 갱신하시오
  const userId = req.params.id;
  const {username, password} = req.body;

  console.log(username, password)
  const query =`UPDATE users SET username=?, password=? WHERE userid=?`
  db.run(query, [username, password, userId],(err)=>{
    if(err){
      res.status(500).send('내부 오류')
      return;
    }
    res.send('사용자 정보 갱신 완료')
  })
})

app.delete('/users/:id',(req,res)=>{
  //입력받은 사용자의 정보를 삭제하시오.
  const userId = req.params.id;
  console.log(userId)
  const query = `DELETE FROM users WHERE userid=?`
  db.run(query,[userId],(err)=>{
    if(err){
      res.status(500).send('내부오류');
      return;
    }
    res.send('삭제 완료')
  })
})


app.get('/users/:id',(req,res)=>{
  //DB 로부터 특정 테이블을 조회하는 코드 작성
  const user_id = req.params.id;

  const query = `SELECT * FROM users WHERE userid=${user_id}`

 db.all(query, (err,rows)=>{
  res.json(rows)
})
});


app.get('/products',(req,res)=>{
  //DB 로부터 특정 테이블을 조회하는 코드 작성
  const {name, price} = req.query;
  query += `SELECT * FROM products`

  console.log(`name:${name}, price: ${price}`);

  function removeQuotes(value){
    return value.replace(/["']/g, "");
  }

  function buildQuery(){
    let query = 'SELECT * FROM products';
    const conditions =[];

    if(name){
      conditions.push(`name LiKE '%${removeQuotes(name)}%'`)
    }
    if(price){
      conditions.push(`price =${price}`)
    }
    if(conditions.length >0){
      query += `WHERE ${conditions.join('AND')}`;
    }

    return query;

  }
  const query = buildQuery();

  console.log(`쿼리: ${query}`)

  db.all(query, (err,rows)=>{
    res.json(rows)
  })
});

app.get('/products/:id',(req,res)=>{
    const product_id = req.params.id;

    const query = `SELECT * FROM products WHERE productid=${product_id}`

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


// curl -X POST 127.0.0.1:3000/users -d username=user3 -d password=password3
// curl -X POST 127.0.0.1:3000/users -d username=user4 -d password=password4
// curl -X POST 127.0.0.1:3000/users -d username=user5 -d password=password5

// curl -X PUT 127.0.0.1:3000/users/2 -d username=user2 -d password=password222
// curl -X PUT 127.0.0.1:3000/users/3 -d username=user333 -d password=password333

// curl -X DELETE 127.0.0.1:3000/users/1
// curl -X DELETE 127.0.0.1:3000/users/4
// curl -X DELETE 127.0.0.1:3000/users/5


//결론
//curl -X GET 127.0.0.1:3000/users
//user2:password222
//user333: password333