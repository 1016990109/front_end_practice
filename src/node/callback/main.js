// test sequential and parallel

const sequential = require('./sequential')
const parallel = require('./parallel')
const promisify = require('../promise/promisify').promisify

let tasks = [
  (input, callback) => {
    setTimeout(() => {
      callback(null, 'task 1 success')
    }, 1000)
  },
  (input, callback) => {
    setTimeout(() => {
      callback(null, `${input}, task 2 success`)
    }, 2000)
  },
  (input, callback) => {
    setTimeout(() => {
      callback(null, `${input}, task 3 success`)
    }, 2000)
  }
]

for(let i = 0; i < tasks.length; i++) {
  tasks[i] = promisify(tasks[i])
}

let promise = tasks.reduce((pre, task) => {
  return pre.then(res => {
    return task(res)
  })
}, Promise.resolve())

promise.then(res => console.log(res))

//curry
sequential(tasks[0])(tasks[1])(tasks[2])()

const tasks2 = [
  callback => {
    setTimeout(() => {
      console.log('taks 1 has completed')
      callback()
    }, 1000)
  },
  callback => {
    setTimeout(() => {``
      console.log('taks 2 has completed')
      callback(new Error('test'))
    }, 2000)
  },
  callback => {
    setTimeout(() => {
      console.log('taks 3 has completed')
      callback()
    }, 2000)
  }
]

parallel(tasks2, err => {
  if (err) {
    return console.log(err)
  }

  console.log('all tasks have completed')
})