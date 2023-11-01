const Employee = require('./employee')

class Manager extends Employee {
  constructor(name, age, gender, jobTitle, salary, team) {
      super(name, age, gender, jobTitle, salary);
      this.team =team
  }

  assignTasks(){
    console.log(`${this.name} 매니저(가) 팀에 업무를 배분하고 있습니다.`)
  }

  greet(){
    console.log(`안녕하세요 저는 ${this.name}이고 ${this.age}살 입니다`)
  }
}

module.exports = Manager