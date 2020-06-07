// 一般情况，普通类
class AppDrawer extends HTMLElement {
  constructor() {
    super()
    this.private = 'private'
  }

  static get observedAttributes() {
    return ['disabled', 'open']
  }

  // 开放属性的 getter 和 setter
  get open() {
    console.log('get property')
    return this.getAttribute('open')
  }

  set open(val) {
    console.log('set property')
    if (val) {
      this.setAttribute('open')
    } else {
      this.removeAttribute('open')
    }
  }
}

// 必须使用短横线
customElements.define('app-drawer', AppDrawer)

// 扩展内置 html 元素
class CustomButton extends HTMLButtonElement {
  constructor() {
    super()

    this.style.backgroundColor = 'blue'

    this.addEventListener('click', () => {
      console.log('click')
    })
  }
}

// 扩展原生元素第三个参数需要告知是哪个原生组件
customElements.define('custom-button', CustomButton, { extends: 'button' })

// 匿名类
window.customElements.define('app-drawer1', class extends HTMLElement {})

// 测试 adoptedCallback
function createWindow(srcdoc) {
  let p = new Promise(resolve => {
    let f = document.createElement('iframe')
    f.srcdoc = srcdoc || ''
    f.onload = () => {
      resolve(f.contentWindow)
    }
    document.body.appendChild(f)
  })
  return p
}

// 1. Create two iframes, w1 and w2.
Promise.all([createWindow(), createWindow()]).then(([w1, w2]) => {
  // 2. Define a custom element in w1.
  w1.customElements.define(
    'x-adopt',
    class extends w1.HTMLElement {
      adoptedCallback() {
        console.log('Adopted!')
      }
    }
  )
  let a = w1.document.createElement('x-adopt')

  // 3. Adopts the custom element into w2 and invokes its adoptedCallback().
  w2.document.body.appendChild(a)
})

// Fetch all the children of <share-buttons> that are not defined yet.
let buttons = document.getElementById('share-buttons')
let undefinedButtons = buttons.querySelectorAll(':not(:defined)')

let promises = [...undefinedButtons].map(socialButton => {
  return customElements.whenDefined(socialButton.localName)
})

// Wait for all the social-buttons to be upgraded.
Promise.all(promises).then(() => {
  console.log('All social-button children are ready.')
  console.log('define share-buttons')
  customElements.define('share-buttons', class extends HTMLElement {
    constructor() {
      super()
      console.log('initial share-buttons')
    }
  })
})

customElements.define(
  'social-button',
  class extends HTMLElement {
    connectedCallback() {
      console.log('初始化操作，可以打开IndexedDB等等')
    }
  }
)
