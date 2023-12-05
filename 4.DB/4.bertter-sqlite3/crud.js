const sqlite = require('better-sqlite3')

const db = sqlite(':memory:');

db.exec(`CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AuTOINCREMENT,
  username TEXT,
  email TEXT)`);

  //사용자 조회

  const allUsers = db.prepare('SELECT * FROM users').all()
  console.log('모든 사용자',allUsers);


  //사용자 추가
  const newUser = {
    username : 'asylee02', email: 'asylee02@naver.com'
  }
  const insert = db.prepare(`INSERT INTO users (id, username, email) VALUES (?,?)`)
  const insertResult = insert.run(newUser.username, newUser.email);
  console.log('추가된 사용자는 : ', insertResult.lastInsertRowid)

  //특정 사용자 조회
  const userId = 1;
  const user = db.prepare('SELECT * FROM users WHERE id=?')
  let result = user.get(userId);
  console.log(`사용자 ${userId}: ${result?.username}`);

  //사용자 갱신

  const updateUser = {
    id:1 ,username: 'asylee02', email: 'asylee022@naver.com'
  }

const update = db.prepare('UPDATE users SET username=?, email=? WHERE id=?');
update.run(updateUser.username, updateUser.email, updateUser.id);
console.log('업데이트 성공');

//사용자 삭제
const deleteUser = {
  id:1,
}

const deleteQuery = db.prepare('DELETE FROM users WHERE id=?');
deleteQuery.run(deleteUser.id)
console.log('삭제 성공')

db.close()