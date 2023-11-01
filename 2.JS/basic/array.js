// 배열 (리스트)
const numbers = [1, 2, 3, 4, 5]


//타입

// 숫자 (String)
// 문자 (Integer, float)
// 불리언 (true, false)
// 객체 (object)
// 스페셜 (null, undefined)


// 배열 안에 있는 멤버들 반복 접근 - 이터레이터 (iterator)
for (let i =0; i< numbers.length; i++){
  console.log(numbers[i]);
}

// forEach문 등장
numbers.forEach((num) => console.log(num))

// 배열 수정
numbers[1] = 4;
