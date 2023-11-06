import { MainCalculator } from "./MainCalculator";

class Engineering extends MainCalculator{
  constructor(first, second, operator){
    super(first,second,operator)
  }
  squareRoot(num){
    this.num = num
    return Math.sqrt(this.num)
  }
}

Engineering = new Engineering(1,2,'+');
Engineering.squareRoot(4)


console.log(Engineering.result());