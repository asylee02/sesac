// 함수 선언

function great(){
  console.log("안녕하세요")
}

// 함수 호출 = 실행
great();

//파라미터 전달
function greatByName(name="익명") {
  console.log(`안녕하세요 ${name}`)
}

greatByName();

function add(a, b){
  let answer = a+b;
  return answer
}
function sub(a, b){
  let answer = a-b;
  return answer
}
function mul(a, b){
  let answer = a*b;
  return answer
}
function div(a, b){
  let answer = a/b;
  return answer
}

// 익명함수

let results = function(x,y){return x*y}

// 화살표 함수

let resultss = ()=>{
  return x*y
}