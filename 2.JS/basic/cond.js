let score = 80;
console.log("----------if----------------")
if(score >= 90){
  console.log('A')
}
else if(90> score >= 80){
  console.log('B')
}
else if(80>score >=70){
  console.log('C')
}
else if(70>score >=60){
  console.log('D')
}
else{console.log('F')}

console.log('switch')
switch(score){
  case 90:
    console.log('A');
    break;
    case 80:
      console.log('B')
      break;
      case 70:
        console.log('C')
        break;
      }
      console.log("---------end-----------")