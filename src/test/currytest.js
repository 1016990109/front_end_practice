function curry(fn) {
  //保留参数合并结果
  let args = []

  let curried = function() {
    if (arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      args.push(...arguments)
      return curried
    }
  }

  return curried
}

let addCurry = curry(function() {
  let sum = 0
  for (let i in arguments) {
    sum += arguments[i]
  }
  return sum
})

console.log(addCurry(1)(2)(3)(4)())