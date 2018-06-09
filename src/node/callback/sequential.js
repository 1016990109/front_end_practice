function iterateSeries(tasks, iteratorCallback, finalCallback, initInput) {
  iteratorCallback = iteratorCallback || function() {}

  finalCallback = finalCallback || function() {}

  if (!(tasks instanceof Array)) {
    return finalCallback(new Error('tasks is not an Array'))
  }

  function iterate(lastResult, index) {
    if (index == tasks.length) {
      //there is no task to process
      return finalCallback('All tasks have completed.')
    }

    const task = tasks[index]
    task(lastResult, (err, result) => {
      if (err) {
        iteratorCallback(err)
        return
      }

      iteratorCallback(null, result)
      //pass the task result to next task
      iterate(result, index + 1)
    })
  }

  iterate(initInput, 0)
}

module.exports = iterateSeries
