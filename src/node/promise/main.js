const promisify = require('./promisify')

let newCallbackBaseApi = promisify.promisify((input, callback) => {
  setTimeout(() => callback(new Error('test'), input + 1), 100)
})

newCallbackBaseApi(999).then(res => console.log(res)).catch(err => console.log(err))