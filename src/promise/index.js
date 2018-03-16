var p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
])
p.then(response => console.log(response))
p.catch(error => console.log(error))

var a = [1, 2, 3]
var b = []
Object.assign(b, a);
console.log(b)

var promise2 = new Promise((resolve, reject) => reject(1)).then(() => {}, (e) => {console.log(e)})
promise2.then(() => {console.log("resolve")}, () => {console.log("reject")})