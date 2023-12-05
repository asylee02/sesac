const database = require('./final_database2')

async function main(){
  db = new database('mydb4.db')

  await db.createTable();
  const newUserA = {username : 'sylee02', email: 'sylee02@naver.com'}
  const newUserB = {username : 'sylee03', email: 'sylee03@naver.com'}

  await db.insertUser(newUserA);
  await db.insertUser(newUserB);
  
  const changeUser ={
    id: 2,
    username: 'asylee02',
    email: 'asylee02@naver.com'
  }
  await db.updateUser(changeUser);

  await db.readUser();

  const deluser = {id:3}
  await db.deleteUser(deluser);
  
  db.close();
}
main()