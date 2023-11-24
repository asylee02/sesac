const fs = require('fs');
const path = require('path');

const Json_file = ['order', 'item', 'orderItem', 'Person', 'store']

// JSON 데이터
for(let i=0; i<Json_file.length; i ++){
let filename = Json_file[i]
const filePath = path.join(__dirname, 'json',filename+'.json');

function generateOrderId(callback){
fs.readFile(filePath, 'utf-8', (err, data) => {
  const OrderData = JSON.parse(data);
  callback(OrderData)
});
}

generateOrderId(function(jsonData){
  
// CSV 헤더 준비
const csvHeader = Object.keys(jsonData[0]).join(',') + '\n';
// CSV 데이터 준비
const csvData = jsonData.map((item) => Object.values(item).join(',')).join('\n');
// CSV 헤더와 데이터 합치기
const csvContent = csvHeader + csvData;
// CSV 파일로 저장
const outputPath = path.join(__dirname, 'csv', filename+'.csv');
fs.writeFileSync(outputPath, csvContent, 'utf-8');
console.log(` ${filename}CSV 파일이 생성되었습니다.`);

})
}