const input = [
  {
    a: 1,
    b: [1, 2, { c: true }, [3]],
    d: { e: 2, f: 3 },
    g: null
  }
]

function flatten(arr) {
  let result = {}

  function deep(arr, key, isObject) {
    if (typeof arr === 'object') {
      for (let i in arr) {
        if (typeof arr[i] === 'object') {
          if (Array.isArray(arr)) {
            deep(
              arr[i],
              String(key) + '[' + String(i) + ']',
              !Array.isArray(arr[i])
            )
          } else {
            deep(
              arr[i],
              String(key) + (isObject === undefined ? '' : '.') + String(i),
              !Array.isArray(arr[i])
            )
          }
        } else if (arr[i] !== null && arr[i] !== undefined) {
          if (isObject) {
            result[String(key) + '.' + String(i)] = arr[i]
          } else if (isObject === false) {
            result[String(key) + '[' + String(i) + ']'] = arr[i]
          } else if (isObject === undefined) {
            result[String(i)] = arr[i]
          }
        }
      }
    } else {
      return arr
    }
  }

  deep(arr, '')

  return result
}

function flatten2(input) {
  let result = {}
  walk(input, result)
  return result
}

function walk(input, result, parent) {
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      walk(input[i], result, parent ? parent + '[' + i + ']' : '[' + i + ']')
    }
  } else if (typeof input === 'object') {
    for (let i in input) {
      walk(input[i], result, parent ? parent + '.' + i : i)
    }
  } else {
    result[parent] = input
  }
}

console.log(flatten(input))
console.log(flatten2(input))
