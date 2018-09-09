function validUft8(arr) {
  let count = 0

  for (let i = 0; i < arr.length; i++) {
    if (count === 0) {
      //start decode
      if (arr[i] >> 5 === 0b110) {
        count = 1
      } else if (arr[i] >> 4 === 0b1110) {
        count = 2
      } else if (arr[i] >> 3 === 0b11110) {
        count = 3
      } else if (arr[i] >> 7 === 0b1) {
        return 0
      }
    } else {
      //left data to decode one charactor
      if (arr[i] >> 6 !== 0b10) {
        return 0
      }

      count--
    }
  }

  return count === 0 ? 1 : 0
}

console.log(validUft8([197,130,1]))
