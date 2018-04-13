var fs = require('fs')
var data = ''

//create Readable
var readerStream = fs.createReadStream('input.txt')

readerStream.setEncoding("utf8")

readerStream.on('data', (chunk) => {
  data += chunk
})

readerStream.on('end',function(){
  console.log(data);
});

readerStream.on('error', function(err){
  console.log(err.stack);
});

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write("123",'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
  console.log("写入完成。");
});

writerStream.on('error', function(err){
  console.log(err.stack);
});

console.log("程序执行完毕");