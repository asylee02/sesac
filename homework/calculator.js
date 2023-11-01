const big = document.querySelector("#big")

const operator = ["*","-","+","/"]
// 숫자 입력시 value에 쌓이고, 연산자 or = 클릭시 numbers 배열로 보내서 총 2개의 숫자 받음.
let numbers =[]
let operatored=[];
let value='';


function number(event){

  //해당 버튼의 값 
  const input = event.target.innerText;

  //만약 버튼의 값이 연산자라면
  if(operator.includes(input)){

    // 연산자를 연속으로 누르지 않았을 때
    if(value){
      //지금까지 value에 싸인 값을 배열로 전달
      numbers.push(value);
      value=''
      //연산자가 *나 / 인지 판별
      priority()
      //연산자도 배열에 전달
      operatored.push(input)
      big.innerText+=input;
      }
    //연산자를 연속으로 눌렀을 때
    else if(!value){
      //연속으로 눌렀을 때, 그 전에 눌린 연산자 삭제
      operatored.pop();
      // 방금 누른 연산자를 전달하면서 대체
      operatored.push(input)
      //화면에서 전에 눌린 연산자 삭제
      big.innerText=big.innerText.slice(0,-1)
      big.innerText+=input;
    }

  }
  else{
    //버튼의 값이 연산자가 아니면 그냥 value에 값 쌓기
    value+=input;
    big.innerText+=input;
  }
  
}
//취소 버튼 누를 시, 모든 배열과 변수 초기화
function handdlecancle(){
  big.innerText=''
  numbers=[];
  operatored=[];
  value=''
}

// = 버튼 누를 시 결과 도출
function handdleresult(){
  numbers.push(value);
  priority()
  while(numbers.length!=1){
    const first = numbers.shift()
    const second = numbers.shift()
    const oper = operatored.shift()
    haddlecalculate(first, second, oper);
  }
  big.innerText=numbers[0]

}

function haddlecalculate(first,second,oper){
  // 만약 value 값이 비어있지 않다면 number로 값 전송
  let answer=0;
  // operator에 따라 연산
  switch(oper){
    //연산을 한번 하고나면, 배열을 초기화하고 결과값을 배열에 넣기
    case '+':
      answer = (+first) + (+second)
      numbers.push(answer);
      break;
    case '/':
      answer = (+first) / (+second)
      numbers.push(answer);
      break;
  }
}

function priority(){
  console.log(numbers)
  console.log(operatored)
  if(operatored[operatored.length-1]=='*'){
    operatored.pop()
    const answer = (+numbers.pop()) * (+numbers.pop())
    numbers.push(answer);
  }
  if(operatored[operatored.length-1]=='/'){
    operatored.pop()
    const answer = (+numbers.pop()) / (+numbers.pop())
    numbers.push(answer);
  }
}
