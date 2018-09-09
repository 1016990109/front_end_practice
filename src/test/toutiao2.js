// let a = [
//   [1, 0, 0, 1, 1],
//   [1, 0, 0, 1, 1],
//   [0, 0, 1, 0, 0],
//   [0, 0, 1, 0, 0],
//   [0, 0, 1, 0, 0]
// ]
let a = [[1, 0],[0,1]]

function splitDepart(arr) {
  var count = 0
  var flag = []

  for (let i = 0; i < arr.length; i++) {
    flag[i] = []
    for (let j = 0; j < arr.length; j++) {
      flag[i][j] = false
    }
  }

  function adjecentNumber(row, col) {
    if (
      row >= 0 &&
      row < arr.length &&
      col >= 0 &&
      col < arr.length &&
      !flag[row][col] &&
      arr[row][col] === 1
    ) {
      //mark flag
      flag[row][col] = true
      //top
      adjecentNumber(row - 1, col)
      //bottom
      adjecentNumber(row + 1, col)
      //left
      adjecentNumber(row, col - 1)
      //right
      adjecentNumber(row, col + 1)

      return true
    }

    return false
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (adjecentNumber(i, j)) {
        count++
      }
    }
  }

  return count
}

console.log(splitDepart(a))
