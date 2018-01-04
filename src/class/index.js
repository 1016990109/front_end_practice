/**
 * Created by HCW on 2018/1/4.
 */
//traditional
function Point (x) {
  var x
  this.x = x

  this.toString = function () {
    return x + 1
  }
}

Point.prototype.foo = function () {
  console.log('foo')
}

var p = new Point(1)
console.log(p.toString())
p.foo()
console.log('==================')

//es5
//if browser not support 'create'
if (!Object.create) {
  Object.create = function (o) {
    function F() {}
    F.prototype = o
    return new F()
  }

}

var Dog = {
  name: '大帅',
  say: function () {
    console.log(this.name + ' 汪 汪')
  }
}

var dog = Object.create(Dog)
dog.say()
console.log('==================')

//simple
var Cat = {
  shareData: 'share',
  createNew: function (name) {
    var cat = {}
    var sound = "private sound"
    cat.name = name
    cat.say = function () {
      console.log(cat.name + " 喵 喵")
      console.log("sound can only access in say(), sound is :" + sound)
    }
    return cat
  }
}

var cat = Cat.createNew("美短")
cat.say()
console.log('==================')

//es6
class Circle {
  constructor(radius) {
    this.radius = radius;
    Circle.circlesMade++;
  };
  static draw(circle, canvas) {
    console.log(circle.radius)
  };
  static get circlesMade() {
    return !this._count ? 0 : this._count;
  };
  static set circlesMade(val) {
    this._count = val;
  };
  area() {
    return Math.pow(this.radius, 2) * Math.PI;
  };
  get radius() {
    return this._radius;
  };
  set radius(radius) {
    if (!Number.isInteger(radius))
      throw new Error("圆的半径必须为整数。");
    this._radius = radius;
  };
}

var circle = new Circle(1)
new Circle(1)
console.log('circles made ' + Circle.circlesMade)
console.log('area is ' + circle.area())
circle.radius = 2
console.log('new circle area is ' + circle.area())

class ColorCircle extends Circle {
  constructor(radius, color){
    super(radius)
    console.log(new.target === undefined)
    this.color = color
  }

  set color(color) {
    this._color = color
  }

  get color() {
    return this._color
  }
}

var colorCircle = new ColorCircle(1, 'blue')
//共用父类静态变量
console.log('colorCircles made ' + ColorCircle.circlesMade)
console.log('area is ' + colorCircle.area())
console.log(ColorCircle.__proto__ == Circle) //true
console.log(ColorCircle.prototype.__proto__ == Circle.prototype) //true
console.log('==================')

function* test() {
  console.log(new.target === undefined)//if equals undefined, then this function is called normally, else by new()
  yield 1
  yield 2
  yield 3
}

var result = test()
console.log(result)

for (var value of test()) {
  console.log(value)
}
