const md5 = require("js-md5")

const str = '_cloamnvazsidlsfzs/.#/.sshjsssih/vpds:c_ogth/aetzne'
const array = [47,16,41,17,40,18,44,31,14,9,26,11,33,42,35,25,30,50,6,12,20,21,15,27,24,0,7,23,28,22,8,10,19,32,3,34,36,4,38,37,13,45,1,39,5,48,46,2,29,49,43]

let realArray = []
for(let i = 0; i < array.length; i++) {
  realArray[array[i]] = str.charAt(i)
}

let result = realArray.join('')
console.log(md5(result))

String.prototype.splice = function(start, delCount, newSubStr) {
  return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

for( let i = 7; i < result.length; i++) {
  for (let j = 0; j < 127; j++) {
    if (md5(result.splice(i, 0, String.fromCharCode(j))) == '5130ea1d95e4dcabc157db2a3506a60c') {
      console.log(result.splice(i, 0, String.fromCharCode(j)))
      break
    }
  }
}
