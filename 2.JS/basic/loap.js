// for(시작값; 실행조건; 시작값의 증감조건;){
// }

for( let i =1; i<9; i++){
  for(let j=1; j<9; j++){
    console.log(i+"*"+j+"="+i*j);
  }
}

// while (조건문){
// }

let n =0;

while(true){
  n = n+1;
  if(n==10){
    continue
  }
  else if(n==20){
    break;
  }
  console.log(n);
}
