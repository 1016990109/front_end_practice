function asyncDealWithUsername(username, cb) {
  setTimeout(() => {
    cb(null, username + ' async')
  }, 100);
}

function myThunk(username) {
  return function(cb) {
    asyncDealWithUsername(username, cb)
  }
}

function asyncFlowWithThunks(generatorFunction) {
  function callback(err) {
    if (err) {
      generator.throw(err)
    }

    //返回除err外的结果
    const results = [].slice.call(arguments, 1)
    const thunk = generator.next(results.length > 1 ? results : results[0]).value
    thunk && thunk(callback)
  }

  const generator = generatorFunction()
  const thunk = generator.next().value
  thunk && thunk(callback)
}

asyncFlowWithThunks(function* () {
  const result = yield myThunk('hcw')
  console.log(result)
  const result1 = yield myThunk('hcw1')
  console.log(result1)
})