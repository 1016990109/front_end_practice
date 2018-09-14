if (Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    //判断调用bind的对象是否是函数
    if (typeof this !== 'function') {
      throw new TypeError(
        'Function.prototype.bind - what is trying to be bound is not callable'
      )
    }

    //剩余参数
    var args = [].slice.call(arguments, 1)
    //原来的this，也就是要bind的函数，因为是函数本身调用bind
    var fToBind = this

    //新函数
    var fBound = function() {
      fToBind.apply(
        this instanceof fBound ? this : oThis,
        args.concat([].slice.call(arguments))
      )
    }

    //如果原型链存在，拷贝原型链
    if (this.prototype) {
      fBound.prototype = this.prototype
    }

    return fBound
  }
}

function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function() {
  return this.x + ',' + this.y
}

var p = new Point(1, 2)
p.toString() // '1,2'

var emptyObj = {}
var YAxisPoint = Point.bind(emptyObj, 0 /*x*/)

var axisPoint = new YAxisPoint(5)
console.log(axisPoint.toString()) // '0,5'
console.log(emptyObj) //{}

console.log(axisPoint instanceof Point) // true
console.log(axisPoint instanceof YAxisPoint) // true
let o = new Point(1,2)
console.log(o.__proto__)//Point.prototype
console.log(Point.prototype)
console.log(o instanceof YAxisPoint)//false
