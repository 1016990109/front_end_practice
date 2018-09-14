class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

let x2 = new Point(-1, 0)
let x1 = new Point(5, 3)

let flowers = [new Point(0, 2), new Point(5, 2)]

let result = {
  r1: 0,
  r2: 0,
  min: 0
}
let equalFlowers = []

flowers.forEach(flower => {
  let r1 = Math.pow(x1.x - flower.x, 2) + Math.pow(x1.y - flower.y, 2)
  let r2 = Math.pow(x2.x - flower.x, 2) + Math.pow(x2.y - flower.y, 2)

  if (r1 < r2) {
    if (r1 > result.r1) {
      result.r1 = r1
    }
  } else if (r1 > r2) {
    if (r2 > result.r2) {
      result.r2 = r2
    }
  } else {
    equalFlowers.push(r1)
  }
})

let maxDis = Math.max(...equalFlowers)
if (result.r1 >= maxDis || result.r2 >= maxDis) {
  result.min = result.r1 + result.r2
} else {
  result.min = Math.min(result.r1, result.r2) + maxDis
}

console.log(result.min)