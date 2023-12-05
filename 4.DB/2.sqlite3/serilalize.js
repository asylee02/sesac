const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(':memory');

db. serialize(()=>{
  db.run(`CREATE TABLE users(id INT, name TEXT)`)
  db.run(`INSERT INTO users VALUES(?,?)`,[1,'user1'])
  db.run(``)
  db.all(`SELECT * FROM users`,(err,rows)=>{
    console.log(rows)
  })
})