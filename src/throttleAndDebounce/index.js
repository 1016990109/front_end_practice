function throttle(fn, timeout, context) {
  //上次没有调用
  if (!fn.lastExec) {
    fn.lastExec = Date.now()
    fn.call(context)
  } else {
    //调用过
    var remaining = Date.now() - fn.lastExec
    if (remaining > timeout) {
      fn.lastExec = Date.now()
      fn.call(context)
    }
  }
}

var fn = function () {
  console.log(Date.now())
}
for (var i = 1; i <= 10; i++) {
  setTimeout(function () {
    throttle(fn, 2000);
  }, 1000 * i);
}

function debounce(fn, timeout, context) {
  //如果上次调用过还没执行，就清除掉，重设定时
  clearTimeout(fn.dId);
  fn.dId = setTimeout(function () {
    fn.call(context);
  }, timeout);
}

for (var i = 1; i <= 10; i++) {
  setTimeout(function () {
    debounce(fn, 2000);
  }, 1000 * i);
}