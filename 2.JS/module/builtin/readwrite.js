const fs = require ('fs');

fs.readFile('example.txt', 'utf8', readFileCallback)
  function readFileCallback(err, data){
  if(err){
    console.error('파일을 읽는데 오류가 발생하였습니다.',err);
    return;
  } 
  console.log("파일내용 : ",data)
}

const content = "파일에 쓸 내용"

fs.writeFile('example.txt', content, writeCallback)

function writeCallback(err, data){
    if(err){
      console.error('파일을 쓰는데 오류가 발생하였습니다.',err);
      return;
    } 
    console.log("완료되었습니다.")
  }

fs.copyFile('example.txt','sdf.txt', copyCallback)

function copyCallback(err, data){
  if(err){
    console.error('파일을 복사하는데 오류가 발생하였습니다.',err);
    return;
  } 
  console.log("복사되었습니다.")
}