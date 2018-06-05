const EventEmitter = require('events').EventEmitter

const eeInstance = new EventEmitter()

// 不能用箭头函数，不然this指向不对
eeInstance.addListener('test', function(message) {
  console.log(`[test]:${message}`)
  console.log(this.listeners('test'))
})

eeInstance.emit('test', 'test message')
