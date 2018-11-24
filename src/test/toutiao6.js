let a = 1
let b = 10000000

function LuckyNumber(a, b) {
  let count = 0
  for (let i = a; i <= b; i++) {
    let str = String(i)
    if (isLucky(str)) {
      count++
    }
  }

  return count
}

function isLucky(str) {
  for (let i = 0; i < parseInt(str.length / 2); i++) {
    if (str.charAt(i) === str.charAt(str.length - 1 - i)) {
      return false
    }
  }
  return true
}

console.log(LuckyNumber(a, b))