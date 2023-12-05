const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('mydb3.db')

db.run(`CREATE TABLE users(
        username TEXT,
        email TEXT)`,(err,row)=>{

            if(err){console.error(err)}

            db.each('SELECT * FROM users', (err, row)=>{
              if(err){
                console.error('쿼리 실패');
                return;
              }
              console.log('All Users: ', row)

              //삽입
              const newUser = {username : 'sylee', email: 'asylee02@naver.com'}

              db.run('INSERT INTO users (username, email) VALUES (?, ?)',[newUser.username, newUser.email],function(err){
                if(err){
                  console.error('데이터 삽입 실패')
                }
                console.log('데이터 삽입 성공:' , this.lastID)

                //수정
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
                      return;
                    }
                    console.log('수정 완료')
                    // 삭제
                    const delUser={
                      id:3
                    }
      
                    db.run('DELETE ROM users WHERE id =?', [delUser.id], (err)=>{
                      if(err){
                        console.error('삭제 실패')
                      }
                      console.log('삭제 성공')
                    })

                  })
    
                  
              })
  
              

            })

  
        });


db.close();

