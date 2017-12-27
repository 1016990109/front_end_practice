/**
 * Created by HCW on 2017/12/25.
 */
let myWorker = require("worker-loader!./worker.js")

let worker = new myWorker()
worker.postMessage("index.js")
worker.onmessage = (event) => {
  console.log('==== main thread ====')
  console.log(event.data)
}

export default class {
  mount(container) {
    document.title = 'worker'
    container.innerHTML = "<p>worker</p>"
  }
}