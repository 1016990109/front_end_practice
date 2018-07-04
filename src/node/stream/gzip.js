const fs = require('fs')
const zlib = require('zlib')
const file = process.argv[2]
fs.readFile(file, (err, buffer) => {
  zlib.gzip(buffer, (err, buffer) => {
    // fs.writeFile(file + '.gz', buffer, err => {
    //   if (err) {
    //     console.log(err)
    //   }

    //   console.log('File successfully compressed')
    // })
    if (err) {
      console.log(err)
      return
    }

    console.log('success')
  })
})