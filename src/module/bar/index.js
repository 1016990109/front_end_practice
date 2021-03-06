/**
 * Created by HCW on 2017/11/3.
 */

// 引入全局对象
import g from '../../global'

// 引入html模板, 会被作为字符串引入
import template from './index.html'

// 引入css, 会生成<style>块插入到<head>头中
import './style.css'

import * as _ from 'underscore'

// 导出类
export default class {
  mount(container) {
    console.log(_.findIndex([1,2,3], 1, this))
    document.title = 'bar'
    container.innerHTML = template
    container.querySelector('.bar__gofoo').addEventListener('click', () => {
      // 调用router.go方法加载 /foo 页面
      g.router.go('/foo')
    })
  }
}