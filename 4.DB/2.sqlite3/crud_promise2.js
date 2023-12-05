const { resolve } = require('path');
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('mydb4.db')

function createTable(){
  return new Promise((resolve,reject)=>{
    
      db.run(`CREATE TABLE users(
        username TEXT,
        email TEXT)`,(err)=>{
          if(err){
            reject(err);
          }else{
            resolve();
          }
        }
      );
   });
}
  function insertUser(){
    return new Promise((reslove,reject)=>{
      const newUser = {username : 'sylee', email: 'asylee02@naver.com'}

      db.run('INSERT INTO users (username, email) VALUES (?, ?)',
        [newUser.username, newUser.email], function(err){
          if(err){
            console.error('데이터 삽입 실패');
            reject();
          }else{
          console.log('데이터 삽입 성공:' , this.lastID)
          resolve();
          }
        }
      )
  }
)}

function updateUser(){
  return new Promise((reslove,reject)=>{
    const updateUser = {
      id:1,
      username : 'sylee',
      email: 'asylee02@naver.com'
    }
    
    db.run('UPDATE users SET username=?, email=? WHERE id=?',
      [ updateUser.id, updateUser.username, updateUser.email],
      (err)=>{
        if(err){
          console.error('수정 실패',err);
          reject();
        }
        console.log('수정 완료')
        resolve();
    })
  }
)}

function deleteUser(){
  return new Promise((reslove,reject)=>{
  const delUser={
    id:3
  }

  db.run('DELETE ROM users WHERE id =?', [delUser.id], (err)=>{
    if(err){
      console.error('삭제 실패')
    }
    console.log('삭제 성공')
  })
}
)}

function readUser(){
  return new Promise((reslove,reject)=>{
    db.each('SELECT * FROM users', (err, row)=>{
      if(err){
        console.error('쿼리 실패');
        reject();
      }else{
      console.log('All Users: ', row)
      reslove();
      }
    })
  }
)}

async function main(){

  await createTable();
  await insertUser();
  await updateUser();
  await readUser();
  await deleteUser();
  
  db.close();
}

main();


