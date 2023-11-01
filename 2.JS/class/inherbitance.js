class Animal{
  constructor(name){
    this.name= name;
  }

  makeSound(){
    return 'Some Sound..'
  }
}

class Dog extends Animal{
  makeSound(){
    return "멍멍"
  }
}

const d = new Dog("고양이");
console.log(d.makeSound())
console.log(d.name)