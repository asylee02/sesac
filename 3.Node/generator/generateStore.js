const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const coffee = ['스타벅스', '커피빈','투썸플레이스','메가커피','빽당방','폴바셋','이디야','엔젤리너스']
const place = ['송파','잠실','홍대','신촌','강서','강남','강북','건대','성동']
const addressList = [
  ["서울특별시", '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  ["대구광역시", '중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군', '군위군']
];

let number;
  function genearteId() {
  number =Math.floor(Math.random() * coffee.length);
  data = coffee[number];
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex').slice(0,10);

}
function generateType(){
  type = coffee[number]
  return type
}
function generateName(){
  const type = coffee[number];
  const which = place[Math.floor(Math.random() * place.length)]
  const num = Math.floor(Math.random() * 10)
  generateType(type)
  return(`${type} ${which}${num}호점`)
}

function generateAddress() {
  const List = addressList[Math.floor(Math.random() * 2)];
  const gu = List[0];
  const dong = List[Math.floor(Math.random()*List.length-1)+1];
  const street = Math.floor(Math.random() * 100) + 1;
  const street2 = Math.floor(Math.random() * 100) + 1;
  const address = `${gu} ${dong} ${street}길 ${street2}`;
  return address;
}

// 100명의 가게사항 생성
const store = [];
for (let i = 0; i < 100; i++) {
  const item = {
    Id: genearteId(),
    Name: generateName(),
    Type: generateType(),
    Address: generateAddress(),
  };
  store.push(item)
} 


// JSON 파일로 저장
const outputPath = path.join(__dirname, 'json', 'Store.json');
const jsonData = JSON.stringify(store, null, 2);
fs.writeFileSync(outputPath, jsonData, 'utf-8');
console.log('store.json 파일이 생성되었습니다.');
