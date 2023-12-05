const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('mydb4.db')

class Database{
  constructor(dbName){
    this.db = new sqlite3.Database(dbName);
  }



 createTable(){
  return new Promise((resolve,reject)=>{
    
      this.db.run(`CREATE TABLE IF NOT EXISTS users(
        id INT,
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
   insertUser(newUser){
    return new Promise((resolve,reject)=>{
      this.db.run('INSERT INTO users (username, email) VALUES (?, ?)',
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

 updateUser(updateUser) {
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE users SET username = ?, email = ? WHERE id = ?',[updateUser.username, updateUser.email, updateUser.id],
      (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('업데이트 성공')
                    resolve();
                }
            }
        );
    });
}

 deleteUser(){
  return new Promise((reslove,reject)=>{
  const delUser={
    id:3
  }

  this.db.run('DELETE ROM users WHERE id =?', [delUser.id], (err)=>{
    if(err){
      console.error('삭제 실패')
      reject();
    }
    console.log('삭제 성공')
    reslove();
  })
}
)}

 readUser(){
  return new Promise((reslove,reject)=>{
    this.db.each('SELECT * FROM users', (err, row)=>{
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
}
module.exports=
  Database
