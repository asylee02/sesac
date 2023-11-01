const numbers = [10, 20, 30, 40, 50];

function max_numbers(numbers){
  // let big= -Infinity;
  let big = numbers[0]
  for (number of numbers){
    if(number>big) big = number;
  }
  console.log(big);
}

function min_numbers(numbers){
  // let big= -Infinity;
  let small = numbers[0]
  for (number of numbers){
    if(number<small) small = number;
  }
  console.log(small);
}

function avg_numbers(numbers){
  const len = numbers.length
  let total
  // let big= -Infinity;
  for(let i; i<len; i++){
    total += numbers[i]
  }
  total = total/len
  console.log(total);
}

max_numbers(numbers);
min_numbers(numbers);
avg_numbers(numbers);









