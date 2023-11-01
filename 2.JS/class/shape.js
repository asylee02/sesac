class Shape{
  getArea(){
    return 0;
  }
}

class Squre extends Shape{
  constructor(sideLength){
    super();
    this.sideLength = sideLength;
  }

  getArea(){
    return this.sideLength ** 2;
  }
}

class Triangle extends Shape{
  constructor(sideLength){
    super();
    this.height = sideLength*Math.sqrt(3)/2;
    this.base = sideLength;
  }

  getArea(){
    return this.height*this.base/2;
  }
}

class Circle extends Shape{
  constructor(radius){
    super();
    this.radius = radius;
  }

  getArea(){
    const PI = 3.14;
    return this.radius ** 2 * PI;
  }
}

const SQUARE = new Squre(4);
console.log(SQUARE.getArea())

const TRIANGLE = new Triangle(4,6);
console.log(TRIANGLE.getArea())

const CIRCLE = new Circle(4);
console.log(CIRCLE.getArea())