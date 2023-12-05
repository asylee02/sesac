const sqlite = require('better-sqlite3')

const db = sqlite('mydb1.db');


db.exec(`CREATE TABLE IF NOT EXISTS greetings(
        username TEXT,
        message TEXT)`);

const msg1 = ['Hello, World'];
const insert = db.prepare(`INSERT INTO greetings (message) VALUES (?)`)
const result = insert.run(msg1);
console.log('데이터 성공적으로 추가:',result.lastID)

const read = db.prepare('SELECT * FROM greetings')
const greetings = read.all();
greetings.forEach((row)=>{
  console.log('Greeting: ',row.message)
})

db.close()










// db.exec('INSERT INTO users (username, email) VALUES (?, ?)',[newUser.username, newUser.email],function(err){
//   if(err){
//     console.error('데이터 삽입 실패')
//   }
//   console.log('데이터 삽입 성공:' , this.lastID)
// })

// const updateUser = {
//   id:1,
//   username : 'sylee',
//   email: 'asylee02@naver.com'
// }
// db.exec('UPDATE users SET username=?, email=? WHERE id=?',
//   [updateUser.username, updateUser.email, updateUser.id],
//   (err)=>{
//     if(err){
//       console.error('수정 실패',err);
//       return;
//     }
//     console.log('수정 완료')
//   })

//   const delUser={
//     id:3
//   }

//   db.exec('DELETE ROM users WHERE id =?', [delUser.id], (err)=>{
//     if(err){
//       console.error('삭제 실패')
//     }
//     console.log('삭제 성공')
//   })

// db.close();

