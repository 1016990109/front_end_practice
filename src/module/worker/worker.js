/**
 * Created by HCW on 2017/12/26.
 */
self.onmessage = function (oEvent) {
  console.log('==== worker thread ====')
  console.log(oEvent.data)
  self.postMessage("worker.js")
};
