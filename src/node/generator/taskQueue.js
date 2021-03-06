const co = require('co')

class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.taskQueue = []
    this.consumerQueue = []
    this.spawnWorkers(concurrency)
  }
  pushTask(task) {
    if (this.consumerQueue.length !== 0) {
      this.consumerQueue.shift()(null, task)
    } else {
      this.taskQueue.push(task)
    }
  }
  spawnWorkers(concurrency) {
    const self = this
    for (let i = 0; i < concurrency; i++) {
      co(function*() {
        while (true) {
          const task = yield self.nextTask()
          yield task
        }
      })
    }
  }
  nextTask() {
    return callback => {
      if (this.taskQueue.length !== 0) {
        return callback(null, this.taskQueue.shift())
      }
      this.consumerQueue.push(callback)
    }
  }
}

let taskQueue = new TaskQueue(2)
taskQueue.pushTask(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(100)
    }, 100)
  }).then(res => console.log(res))
})

taskQueue.pushTask(callback => {
  setTimeout(() => {
    callback(null, 200)
  }, 100)
})
