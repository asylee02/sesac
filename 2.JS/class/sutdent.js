const Employee = require('./employee')

class Student extends Employee {
  constructor(name, age, gender, student_number, major) {
      super(name, age, gender);
      this.student_number =student_number;
      this.major = major
  }

  study(){
    console.log(`${this.name} 학생이 ${this.major}을 공부하고 있습니다`)
  }
}

module.exports = Student