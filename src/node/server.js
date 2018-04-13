let http = require('http')
let url = require('url')

http.createServer((request, response) => {
  let pathname = url.parse(request.url).pathname
  console.log("Request for " + pathname + " received.");

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888)

console.log("Server has started.");