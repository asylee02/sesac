const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const menu = [
  {
    "name": "OrangeCake",
    "price": 4500
  },
  {
    "name": "GrapeCake",
    "price": 5000
  },
  {
    "name": "StrawberryCake",
    "price": 4500
  },
  {
    "name": "ChocolateCake",
    "price": 5500
  },
  {
    "name": "LemonCake",
    "price": 5000
  },
  {
    "name": "RedVelvetCake",
    "price": 6000
  },
  {
    "name": "Espresso",
    "price": 3000
  },
  {
    "name": "Cappuccino",
    "price": 3500
  },
  {
    "name": "Latte",
    "price": 3500
  },
  {
    "name": "Mocha",
    "price": 4000
  },
]
let count = 0
let item;
function genearteId() {
  const data = 'item'+String(count);
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

function generateType(){
    if(item.name.slice(-4)==='Cake'){
      return 'Cake'
  }
    else{
      return 'Coffee'
    }
}
  


function generateName(){
  const item_random = Math.floor(Math.random() * 10);
  item = menu[item_random]
  return item.name
}


const items =[]
for (let i = 0; i < 20; i++) {
  count+=i+1;
  const itemss = {
    Id: genearteId(),
    Name: generateName(),
    Type: generateType(),
    UnitPrice: item.price,
    
  };
  items.push(itemss)
} 

const outputPath = path.join(__dirname, 'json', 'Item.json')
const jsonData = JSON.stringify(items, null, 2);
fs.writeFileSync(outputPath, jsonData, 'utf-8');
console.log('item.json 파일이 생성되었습니다.');