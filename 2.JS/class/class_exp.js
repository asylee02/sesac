const Car = class{
  constructor(make, model){
    this.make = make;
    this.model = model;
  }
  drive(){
    return `${this.make} ${this.model} 차가 운전 중입니다.`
  }
  stop(){
    return `${this.make} ${this.model}차가 멈춥니다.`
  }
  delete(){
    return `${this.make} ${this.model}차가 폐차됩니다..`
  }
}

const myCar = new Car('kia', 'k3')
const yourCar = new Car('tesla', 'Mode13')

console.log(myCar.drive())
console.log(myCar.stop())
console.log(myCar.delete())
console.log(myCar)
console.log(yourCar)
console.log(yourCar.drive())
console.log(yourCar.stop())
console.log(yourCar.delete())