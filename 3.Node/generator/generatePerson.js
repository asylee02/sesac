const fs = require('fs');
const crypto = require('crypto');
const path = require('path');


const first = ['김', '이', '박', '최', '정', '강', '조', '임', '한', '오'];
const middle = ['민', '상', '은', '영', '수', '서', '현'];
const last = ['재', '연', '주', '별', '훈', '서', '지', '수', '숙'];
const thirty = [4, 6, 9, 11];
const addressList = [
  ["서울특별시", '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  ["대구광역시", '중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군', '군위군']
];
let person_id='';
  function genearteId(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  person_id = hash.digest('hex');
}



function generateName() {
  const sung = first[Math.floor(Math.random() * first.length)];
  const name1 = middle[Math.floor(Math.random() * middle.length)];
  const name2 = last[Math.floor(Math.random() * last.length)];
  const fullname = `${sung}${name1}${name2}`
  genearteId(fullname)
  return fullname;
}

function generateBriday() {
  while (true) {
    const year = 1980 + Math.floor(Math.random() * 30);
    const month = 1 + Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 31) + 1;
    if (thirty.includes(month)) {
      if (day !== 31) continue;
    } else if (month === 2) {
      if (day <= 28) {
        return `${year}년 ${month}월 ${day}일`;
      }
    } else {
      return `${year}년 ${month}월 ${day}일`;
    }
  }
}

function generateGender() {
  return Math.random() < 0.5 ? '남성' : '여성';
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

// 100명의 인적사항 생성
const people = [];
for (let i = 0; i < 1000; i++) {
  const person = {
    Name: generateName(),
    Id: person_id.slice(0,10),
    Birth: generateBriday(),
    Gender: generateGender(),
    Address: generateAddress(),
  };
  people.push(person);
}

// JSON 파일로 저장
const outputPath = path.join(__dirname, 'json', 'Person.json');
const jsonData = JSON.stringify(people, null, 2);
fs.writeFileSync(outputPath, jsonData, 'utf-8');
console.log('people.json 파일이 생성되었습니다.');
