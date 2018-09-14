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

flowers.forEach(flower => {
  //随机选取一朵花作为半径
  let r1 = Math.pow(x1.x - flower.x, 2) + Math.pow(x1.y - flower.y, 2)
  let minR2 = 0
  flowers.forEach(f => {
    if (Math.pow(x1.x - f.x, 2) + Math.pow(x1.y - f.y, 2) > r1) {
      //不在第一个圈
      if (Math.pow(x2.x - f.x, 2) + Math.pow(x2.y - f.y, 2) > minR2) {
        //更新第二个圈
        minR2 = Math.pow(x2.x - f.x, 2) + Math.pow(x2.y - f.y, 2)
      }
    }
  })
  let min = r1 + minR2
  if (result.min === 0) {
    result.min = min
  } else {
    if (min < result.min) {
      result.min = min
    }
  }
});

//没考虑有一个喷泉可能不需要浇花的情况
console.log(result.min)