var PENDING = 0, FULFILLED = 1, REJECTED = 2

function Promise(fn) {
  let state = PENDING
  let value = null
  let handlers = []

}