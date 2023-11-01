
const Person = require('./person')
const Employee = require('./employee')
const Manager = require('./manager')
const Student = require('./sutdent')
const Customer = require('./customer')

const person1 = new Person("철수", 25, "남성");
person1.greet()
person1.walk();
person1.eat();



// Employee 생성
const employee1 = new Employee("영희", 30, "여성", "매니저", 50000);
employee1.greet();
employee1.displayInfo();
employee1.walk();
employee1.work();


function introduce(people){
  for (const person of people){
    person.greet()
  }
}

// Manager 객체 생성 및 활용
const manager1 = new Manager("영민", 35, "남성", "팀장", 60000, "개발팀");
manager1.assignTasks(); // ""영민 매니저가 팀에 업무를 배분하고 있습니다."" 출력

// Student 객체 생성 및 활용
const student1 = new Student("지연", 20, "여성", "2023001", "컴퓨터 공학");
student1.study(); // ""지연 학생이 컴퓨터 공학을 공부하고 있습니다."" 출력

// Customer 객체 생성 및 활용
const customer1 = new Customer("태식", 30, "남성", "C1001", ["주문1", "주문2"]);
customer1.placeOrder(); // ""태식 고객이 주문을 완료했습니다."" 출력

const people = [manager1. student1, customer1, employee1]

introduce([people])