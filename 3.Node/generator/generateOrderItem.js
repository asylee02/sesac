const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const filePath = path.join(__dirname, 'json','order.json');
const filePath2 = path.join(__dirname, 'json', 'item.json');
let count =0;

function generateOrderId(callback){
fs.readFile(filePath, 'utf-8', (err, data) => {
  const OrderData = JSON.parse(data);
  callback(OrderData)
});
}

function generateItemId(callback){
fs.readFile(filePath2, 'utf-8', (err, data) => {
  const ItemData = JSON.parse(data);
  callback(ItemData)
});
}

function genearteId() {
  const data = 'orderitem'+String(count);
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex').slice(0,10);
}

function changeJson(){
  const outputPath = path.join(__dirname, 'json', 'orderItem.json'); // 파일을 저장할 경로 지정
const jsonData = JSON.stringify(orderItem, null, 2);
fs.writeFileSync(outputPath, jsonData, 'utf-8');
console.log('orderItem.json 파일이 생성되었습니다.');

}

const orderItem=[]
generateOrderId(function(OrderId){
  generateItemId(function(ItemId){
    for (let i = 0; i < 50000; i++) {
      const order_num = Math.floor(Math.random() * OrderId.length);
      const item_num = Math.floor(Math.random() * ItemId.length);
      count=i+1;
      const item = {
        Id: genearteId(),
        OrderId: OrderId[order_num].Id,
        ItemId : ItemId[item_num].Id
      };
      orderItem.push(item)
    } 
    changeJson();
  })
})
