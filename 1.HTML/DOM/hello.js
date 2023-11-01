function sayHello(){
  console.log('hello');
  p_tag =document.createElement('p')  
  document.body.append(p_tag);
  p_tag.innerText='hello';
}

function fruitDisplay(event){
  let result = document.getElementById("fruit").value;
  document.write(result+'가 선택되었습니다.')

  //switch문 사용
}