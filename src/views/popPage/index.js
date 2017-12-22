/**
 * Created by HCW on 2017/12/22.
 */
import $ from 'zepto'

let popPage = {};

popPage.init = function (iScroll, options) {
  var self = this;
  location.hash = '';
  self.showFlag = false;
  self.parentEl = $('<div class="pop-page"><div class="user-control" id="user-control"><p>123</p></div></div>');
  window.addEventListener('hashchange', function (event) {
    event.preventDefault();
    if (location.hash == "#poppage") {
      //前进键打开(ios)，直接清hash
      if (!self.showFlag) {
        location.hash = '';
        return;
      }
      self.showFlag = false;
      //body设置overflow可能会滚到到头部，先保存
      self.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //安卓需要给body和html都加上才会锁住
      $('body').addClass('fix-scroll');
      //小的兼容问题，不设置的页面有几率不回到顶部
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      $('body').append(self.parentEl);
      //android2.3 bug，不加setTimeout初始化iSroll失败
      setTimeout(function () {
        //class改变得在setTimeout里面
        //animation   android2.3部分支持，测试无效，最后使用了transction
        self.parentEl.addClass('from-right');
        //判断iScroll是否传入
        if (iScroll != undefined) {
          options = options || {click: true};
          new iScroll(document.getElementById('user-control'), options);
        }
      }, 0);
    } else {
      //还原，清空
      $('body').removeClass('fix-scroll');
      self.el().empty();
      self.parentEl.remove().removeClass('from-right');
      document.documentElement.scrollTop = self.scrollTop;
      document.body.scrollTop = self.scrollTop;
    }
  });
};

popPage.newPage = function () {
  var self = this;
  self.showFlag = true;
  //这样来触发hashchange方法
  location.hash = "#poppage";
  return self.el();
};
popPage.el = function () {
  var self = this;
  return self.parentEl.children('.user-control');
}
popPage.close = function () {
  //这里加了个setTimeout，就可以直接清除了
  setTimeout(function () {
    if (location.hash == "#poppage") {
      history.go(-1);
    } else {
      // console.log('还未添加页面');
    }
  }, 0);
}

module.exports = popPage;