function Promise(fn) {
  var doneCallback = []
  var failCallback = []
  var state = 'pending'
  var value

  this.then = function (done, fail) {
    switch (state) {
      case 'pending':
        doneCallback.push(done);
        failCallback.push(fail || null)
        return this
      case 'fulfilled':
        done(value)
        return this
      case 'rejected':
        fail()
        return this
    }
    doneCallback.push(done);
    return this
  }

  function resolve(newValue) {
    // doneCallback(value)
    state = "fulfilled";
    value = newValue;
    setTimeout(function(){
      for (let i = 0; i < doneCallback.length; i++) {
        value = doneCallback[i](value);

        if (value instanceof Promise) {
          for (i++; i < doneCallback.length; i++) {
            value.then(doneCallback[i])
          }
        }
      }
    },0);
  }
  
  function reject(reason) {
    state = 'rejected'

    setTimeout(() => {
      if (failCallback.length == 0 || !(failCallback[0] instanceof Function)) {
        return
      }
      value = failCallback[0](reason)
      if (value instanceof Promise) {
        for (let i = 1; i < failCallback.length; i++) {
          value.then(doneCallback[i], failCallback[i])
        }
      } else {
        doneCallback.shift()
        failCallback.shift()
        resolve(value)
      }
    }, 0)
  }

  fn(resolve, reject);
}

var p = function (){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      reject('p 的结果');
    }, 100);
  });
}
var p2 = function (input){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      console.log('p2拿到前面传入的值：' + input)
      resolve('p2的结果');
    }, 100);
  });
}
p()
  .then(function(res){console.log('p的结果:' + res); return 'p then方法第一次返回'},function(value){console.log(value);return 'p then方法第一次错误的返回'})
  .then(function(res){console.log('p第一次then方法的返回：'+res); return 'p then方法第二次返回'})
  .then(p2)
  .then(function(res){console.log('p2的结果：' + res)});