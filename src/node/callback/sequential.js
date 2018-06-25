let currying = function(fn) {
  let args = [];

  return function() {
    if (arguments.length === 0) {
      return fn.apply(this, args); // 没传参数时，调用这个函数
    } else {
      [].push.apply(args, arguments); // 传入了参数，把参数保存下来
      return arguments.callee; // 返回这个函数的引用
    }
  }
}

let iterateSeries = currying(function() {
  let tasks = arguments

  let iterate = (lastResult, index) => {
    lastResult = lastResult || ''

    if (index == tasks.length) {
      return
    }

    tasks[index](lastResult, (err, result) => {
      if (err) {
        console.log(err)
        return
      }

      console.log(result)
      iterate(result, index + 1)
    })
  }

  iterate(null, 0)
})

module.exports = iterateSeries
