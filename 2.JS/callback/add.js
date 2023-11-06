function add(a,d, callback){
  const sum = a+d;
  callback(a,d,sum);
}

function displayResult(a,d,result){
  console.log('결과: ',a,"+",d,"=",result)
}

res = add(2, 5, displayResult);