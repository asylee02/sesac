export class MainCalculator{
  constructor(first, second, operator){
    this.first = parseInt(first)
    this.second = parseInt(second)
    this.operator = operator

    this.answer = eval(`first${operator}second`)
  }
  result(){
    return this.answer
  }
}
