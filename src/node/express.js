let express = require('express')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let multiparty = require('multiparty')
let util = require('util')
let fs = require('fs')
let app = express()

//静态资源
app.use(express.static('public'))

//解析内容
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//使用cookie
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log("Cookies: " + util.inspect(req.cookies));

  console.log("请求协议：%s", req.protocol)
})

app.get('/userList', (req, res) => {
  fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
    console.log(data)
    res.end(data)
  })
})

app.post('/addUser', (req, res) => {
  fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
    let users = JSON.parse(data)
    let form = new multiparty.Form()
    let newUser = req.body
    form.parse(req, (err, fields, files) => {
      fields
    })
  })
})

let server = app.listen(8081, () => {
  let host = server.address().address
  let port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})