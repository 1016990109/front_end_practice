 let express = require('express')

 let app = express()

 app.get('/', (req, res) => {
   res.jsonp()
   res.send('Hello World!')

   console.log("请求协议：%s", req.protocol)
 })

 let server = app.listen(8081, () => {
   let host = server.address().address
   let port = server.address().port

   console.log("应用实例，访问地址为 http://%s:%s", host, port)
 })