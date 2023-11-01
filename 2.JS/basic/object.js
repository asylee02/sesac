let number =1;
let number1 = 'hello';
let number3 = 3;
number3 = 'hello';

let person3 = {name : "Alice", age : 30, job:"Enginner"}
let person = {name : "Alice", age : 30, job:"Enginnerd"}

let person2 ={
  name : "Alice",
  age : 30, 
  job:"Enginnerd"
}

console.log(person2);

//객체 접근 가능
console.log(person2.age);

// 속성 추가
  person2.location = 'seoul';

// 속성 변경

  person2.age = 15;

// 속성 삭제
  delete person2.location;