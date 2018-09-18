function cloneDeep(value) {
  let result

  //other type, includes function
  if (typeof value !== 'object') {
    result = value
    return result
  }

  //暂时不考虑数组上的属性
  if (Array.isArray(value)) {
    result = []
    for (let i in value) {
      result[i] = cloneDeep(value[i])
    }
    return result
  }

  //Object

  //copy prototype
  result = Object.create(value.__proto__)
  for (let i in value) {
    if (value.hasOwnProperty(i)) {
      result[i] = cloneDeep(value[i])
    }
  }
  return result
}

function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.getString = function() {
  console.log(this.x, this.y)
}

let obj = {
  arr: [new Point(1, 2)],
  o: {
    a: [1, 2, {a1: '123'}]
  },
  func: function() {
    console.log('function')
  }
}

let result = cloneDeep(obj)
result.arr[0].getString()