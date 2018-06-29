const co = require('co')

// 已有的异步函数
function asyncDealWithUsername(username, cb) {
  setTimeout(() => {
    cb(null, username + ' async')
  }, 100);
}

// 这里也可以使用 promisify 生成 Promise
function generateMyPromise(username) {
  return new Promise((resolve, reject) => {
    asyncDealWithUsername(username, function(err) {
      if (err) {
        reject(err)
      }

      resolve([].slice.call(arguments, 1))
    })
  })
}

function asyncFlowWithPromise(generatorFunction) {
  function processPromise() {
    promise.then(res => {
      if (res) {
        promise = generator.next(res.length > 1 ? res : res[0]).value
        promise && processPromise()
      }
    }).catch(err => generator.throw(err))
  }

  const generator = generatorFunction()
  let promise = generator.next().value
  promise && processPromise()
}

asyncFlowWithPromise(function* () {
  const result = yield generateMyPromise('hcw')
  console.log(result)
  const result1 = yield generateMyPromise('hcw1')
  console.log(result1)
})

// 使用co实现异步控制流
co(function* () {
  const result = yield generateMyPromise('hcw')
  console.log(result)
  const result1 = yield generateMyPromise('hcw1')
  console.log(result1)
})