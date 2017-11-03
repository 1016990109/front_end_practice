/**
 * Created by HCW on 2017/11/3.
 */
// 引入全局对象
// import g from '../../global'

import history from '../../html5/history'

// 引入html模板, 会被作为字符串引入
import template from './index.html'

// 引入css, 会生成<style>块插入到<head>头中
import './style.css'

import $ from 'zepto'

// 导出类
export default class {
  mount(container) {
    document.title = 'foo'
    container.innerHTML = template
    container.querySelector('.foo__gobar').addEventListener('click', () => {
      // 调用router.go方法加载 /bar 页面
      // g.router.go('/bar')
      history.newPage({
        hideDiv: $('.foo__gobar'),
        addDiv: $('<p>Hello</p>')
      })
    })
  }
}