//ajax
let Ajax = {
  get: function (url, fn) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", url, true) //true 代表是否异步
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
        //readyState=4说明请求已完成，0未初始化，1正在发送，2send方法完成，3正在解析响应内容
        fn.call(this, xhr.responseText)
      }
    }
    xhr.send()
  },

  post: function (url, data, fn) {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
        fn.call(this, xhr.responseText)
      }
    }
    xhr.send(data)
  }
}

//js 数组去重
Array.prototype.unique = function () {
  let arr = [], n = {}
  for (let i = 0; i < this.length; i++) {
    if (!n[this[i]]) {
      n[this[i]] = true
      arr.push(this[i])
    }
  }
  return arr
}

//js 数组排序
Array.prototype.sort = function () {
  for (let i = 0; i < this.length; i++) {
    for (let j = i; j < this.length; j++) {
      if (this[i] < this[j]) {
        this[i] = this[i] ^ this[j]
        this[j] = this[i] ^ this[j]
        this[i] = this[i] ^ this[j]
      }
    }
  }

  return this
}
//快排
Array.prototype.sort = function () {
  let quickSort = function (arr) {
    if (arr.length <= 1) return arr
    let pivot = arr.splice(0, 1)[0]//获取基准
    let left = [], right = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }

    return quickSort(left).concat([pivot], quickSort(right))
  }
  return quickSort(this)
}

let a = [5,2,2,3,3]
console.log(a.sort());

//闭包
// for (var i = 0; i < 3; i++) {
//   ((i) => {
//     setTimeout(() => {
//       console.log(i);
//     }, 100)
//   })(i)
// }

//求和
var b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], sum = 0;
sum = b.slice(0, 10).reduce((preValue, currentValue, currentIndex, array) => {
  return preValue.concat([currentValue + 1])
}, [])

console.log(sum);

let c = "daf"
c = c.split("").reverse().join("")
console.log(c);

//js 继承
//组合继承
function Animal() {
  this.name = "animal"

  this.sleep = function () {
    console.log("animal sleep");
  }
}

function Cat() {
  Animal.call(this)
  this.name = "cat"
}

Cat.prototype = new Animal()

new Cat().sleep()

//throttle
let _ = {}
_.throttle = function (fn, timeout) {
  let previous = 0
  let timeoutFn, context, args, result
  
  let throttled = function () {
    let now = Date.now()
    context = this
    args = arguments
    let remaining = timeout - (now - previous)
    if (remaining <= 0) {
      if (timeoutFn) {
        clearTimeout(timeoutFn)
        timeoutFn = null
      }

      //立即调用
      result = fn.apply(context, args)
      previous = now
    } else if (!timeoutFn) {
      timeoutFn = setTimeout(function() {
        previous = Date.now()
        timeoutFn = null
        result = fn.apply(context, args)
      }, remaining)
    }

    return result
  }

  return throttled
}

_.debounce = function (fn, timeout) {
  let timeoutFn, result

  let debounced = function () {
    let context = this, args = arguments
    if (timeoutFn) {
      clearTimeout(timeoutFn)
    }

    timeoutFn = setTimeout(() => {
      timeoutFn = null
      result = fn.apply(context, args)
    }, timeout)

    return result
  }

  return debounced
}

let fn = _.debounce(function(value){
  console.log(Date.now() + "--" + value)
},2000);
for(let i = 1;i < 1;i++){
  setTimeout(function(){fn(i)},1000*i);
}
