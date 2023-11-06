const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const filePath = path.join(__dirname,'json', 'Person.json');
const filePath2 = path.join(__dirname,'json', 'store.json');
let count =0;

function generateUserId(callback){
fs.readFile(filePath, 'utf-8', (err, data) => {
  const peopleData = JSON.parse(data);
  callback(peopleData)
});
}

function generateStoreId(callback){
fs.readFile(filePath2, 'utf-8', (err, data) => {
  const storeData = JSON.parse(data);
  callback(storeData)
});
}

function genearteDate(){
const startDate = new Date('2023-01-01');
const endDate = new Date('2023-12-31');

const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
return(randomDate)
}

function genearteId() {
  const data = 'order'+String(count);
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex').slice(0,10);
}

function changeJson(){
  const outputPath = path.join(__dirname, 'json', 'Order.json');
  const jsonData = JSON.stringify(order, null, 2);
  fs.writeFileSync(outputPath, jsonData, 'utf-8');
  console.log('order.json 파일이 생성되었습니다.');
}

const order = [];

generateUserId(function(userId){
  generateStoreId(function(st_Id){
    for (let i = 0; i < 100; i++) {
      const people_num = Math.floor(Math.random() * 1000);
      const store_num = Math.floor(Math.random() * 100);
      count=i+1;
      const item = {
        Id: genearteId(),
        StoredId: st_Id[store_num].Id,
        orderAt: genearteDate(),
        UserId: userId[people_num].Id,
      };
      order.push(item)
    } 
    changeJson();
  })
})
