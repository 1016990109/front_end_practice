function parallel(tasks, callback) {
  callback = callback || (() => {})

  if (!tasks) {
    return callback(new Error(`tasks can't be empty`))
  }

  if (!(tasks instanceof Array)) {
    return callback(new Error(`tasks is not an Array`))
  }

  let completed = 0

  tasks.forEach(task => {
    task(err => {
      if (err) {
        return callback(err)
      }

      if (++completed == tasks.length) {
        return callback()
      }
    })
  })
}

module.exports = parallel