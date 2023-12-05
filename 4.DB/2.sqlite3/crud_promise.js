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
  function insertUser(newUser){
    return new Promise((reslove,reject)=>{
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

function updateUser(updateUser) {
  return new Promise((resolve, reject) => {
      db.run('UPDATE users SET username = ?, email = ? WHERE id = ?',
          [updateUser.username, updateUser.email, updateUser.id],
          (err) => {
              if (err) {
                  reject(err);
              } else {
                  resolve();
              }
          }
      );
  });
}

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
  const newUserA = {username : 'sylee02', email: 'sylee02@naver.com'}
  const newUserB = {username : 'sylee03', email: 'sylee03@naver.com'}

  await insertUser(newUserA);
  await insertUser(newUserB);
  
  const changeUser ={
    id: 3,
    username: 'asylee02',
    email: 'asylee02@naver.com'
  }

  await updateUser(changeUser);
  await readUser();

  const deluser = {id:3}
  await deleteUser(deluser);
  
  db.close();
}

main();


