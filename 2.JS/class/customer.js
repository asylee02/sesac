const Employee = require('./employee')

class Customer extends Employee {
  constructor(name, age, gender, order_num, product) {
      super(name, age, gender);
      this.product = product;
      this.order_num=order_num;
  }

  placeOrder(){
    console.log(`${this.name} 고객님이 주문을 완료했습니다.`)
  }
}

module.exports=Customer