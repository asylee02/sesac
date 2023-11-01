function divide (a,b){
  try{
    if(b===0){
      throw "0으로 나눌 수 없습니다."
    }
  }
  catch{
    console.log('오류 발생',0)
  }
}

divide(a,0)