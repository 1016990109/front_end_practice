const cluster = require('cluster')
const os = require('os')
const http = require('http')

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log('=========================')
    console.log('exit')
    console.log(`worker ${worker.id}`)
  })

  cluster.on('listening', (worker, address) => {
    console.log('=========================')
    console.log(`listening worker ${worker.id} on address ${address}`)
  })

  cluster.on('message', (worker, message) => {
    console.log('=========================')
    console.log(`message ${message}`)
  })

  cluster.on('online', (worker) => {
    console.log('=========================')
    console.log(`worker ${worker.id} online`)
  })
} else {
  http
    .createServer(function (req, res) {
      res.writeHead(200)
      res.end('hello world\n')
    })
    .listen(8090)


  console.log(`worker ${process.id} started`)
  process.send(`worker ${process.id} started`)
}