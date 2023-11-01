function divide(a,b){
  try{
    if(typeof b !== 'number'){
      throw new TypeError('숫자를 입력하세요')
    }
    if(b===0){
      throw new Error('0으로 나눌 수 없습니다.')
    }
    if(a.toString().length > 9 || b.toString().length > 9){
      throw new RangeError('길이가 9글자 이상인 경우 지원되지 않습니다')
    }
  }
  catch(error){
      if (error instanceof TypeError){
        console.error('타입 오류가 발생하였습니다.', error.message)
      }
      else{
        console.error('기타 오류가 발생하였습니다.', error.message)
      }
  }

}
