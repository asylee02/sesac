const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout, 
});

rl.question('구구단을 입력하세요: ', (input) => {
  const num = parseInt(input);

  if (num >= 1 && num <= 9) {
    console.log(`${num}단 구구단을 출력합니다.`);
    for (let i = 1; i <= 9; i++) {
      console.log(`${num} * ${i} = ${num * i}`);
    }
  } else {
    console.log('1부터 9까지의 숫자를 입력하세요.');
  }

  rl.close();
});
