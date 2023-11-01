class Circle{
  constructor(radius){
    this.radius=radius
  }
  get diameter(){
    return this.radius*2
  }
  set diameter(diameter){
    this.radius=diameter;
  }
}

const myCircle = new Circle(5);
