const readline = require('readline');

class MainCalculator {
  constructor(first, second, operator) {
    this.first = parseInt(first);
    this.second = parseInt(second);
    this.operator = operator;
    this.answer = eval(`${first}${operator}${second}`);
  }
  result() {
    return this.answer;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let step = 1;
const userInput = {};

function askQuestions() {
  if (step === 1) {
    rl.question('Select Calculator Mode: \n1. Engineering Calculator \n2. Standard Calculator\n3. Programmer Calculator\nEnter the mode (1/2/3): ', (mode) => {
      userInput.mode = mode;
      step++;
      askQuestions();
    });
  }
  else if (step === 2 && userInput.mode === '2') {
    rl.question('Enter first number: ', (first) => {
      userInput.first = first;
      step++;
      askQuestions();
    });
  } else if (step === 3 && userInput.mode === '2') {
    rl.question('Enter operator: ', (operator) => {
      userInput.operator = operator;
      step++;
      askQuestions();
    });
  } else if (step === 4 && userInput.mode === '2') {
    rl.question('Enter second number: ', (second) => {
      userInput.second = second;
      step++;
      const Standard = new MainCalculator(userInput.first, userInput.second, userInput.operator);
      console.log(Standard.result());
      rl.close();
    });
  } else {
    rl.close();
  }
}

askQuestions();
