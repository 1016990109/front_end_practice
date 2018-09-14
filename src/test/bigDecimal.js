// 大数相加，含小数点

function add(a, b) {
  var carry = 0,
    result = []

  if(a.includes('.') && !b.includes('.')) {
    result.push('.', ...a.split('.')[1])
  } else if (!a.includes('.') && b.includes('.')) {
    result.push('.', ...b.split('.')[1])
  } else if (a.includes('.') && b.includes('.')) {
    let pointA = a.split('.')[1], pointB = b.split('.')[1]
    let len = Math.max(pointA.length, pointB.length), i = len
    while (i--) {
      let sum = (+pointA[i] || 0) + (+pointB[i] || 0) + carry
      carry = parseInt(sum / 10)
      let tail = sum % 10
      if (tail !== 0 || result.length !== 0) {
        result.unshift(tail)
      }
    }

    if (result.length !== 0) {
      result.unshift('.')
    }
  }
  
  let numberA = a.split('.')[0], numberB = b.split('.')[0]
  let len = Math.max(numberA.length, numberB.length),
    i = len
  while (i--) {
    var sum =
      (+numberA[i - len + numberA.length] || 0) + (+numberB[i - len + numberB.length] || 0) + carry
    carry = parseInt(sum / 10)
    result.unshift(sum % 10)
  }
  if (carry) result.unshift(carry)
  return result.join('')
}

console.log(add('1.222', '13.7791'))
