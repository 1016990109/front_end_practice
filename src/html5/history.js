var $ = require('zepto');
var historyState = {};
historyState.ifSupport = function(){
    var ua = navigator.userAgent;
    if ((ua.indexOf('Android 2.') !== -1 ||
        (ua.indexOf('Android 4.0') !== -1)) &&
        ua.indexOf('Mobile Safari') !== -1 &&
        ua.indexOf('Chrome') === -1 &&
        ua.indexOf('Windows Phone') === -1) {
        return false;
    }
    return (window.history && 'pushState' in window.history);
}

/**
 * @param   options     {required}  参数对象
 {
     hideDiv     {required}  需要隐藏的部分
     addDiv      {required}  新增的部分
     wrapDiv     {optional}  包裹的元素，若没有，默认为body
     bindFunc    {optional}  对页面新添加的东西绑定类似点击的事件
     state       {optional}  传入的数据
     title       {optional}  目前被忽略
     url         {optional}  url，需求是不变
 }
 */
historyState.newPage = function(options){
    var hideDiv = options.hideDiv;
    var addDiv = options.addDiv;
    var wrapDiv = options.wrapDiv || $('body');
    var bindFunc = options.bindFunc || function(){};
    var state = options.state || {};
    var title = options.title || '';
    var url = options.url || '';
    //隐藏当前页面，并添加进新页面
    hideDiv.hide();
    wrapDiv.append(addDiv);
    //执行一下可能存在的绑定
    bindFunc();
    //如果支持的话就使用新特性，不支持的话，就不处理了
    if(this.ifSupport()){
        var popFunc = function() {
            addDiv.remove();
            hideDiv.show();
            //手动清掉了这个方法
            window.removeEventListener("popstate",popFunc);
        };
        window.addEventListener("popstate",popFunc);
        window.history.pushState(state,title,url);
    }
};

/**
 * @param   options     {required}  参数对象
 {
     hideDiv     {required}  需要隐藏的部分
     showDiv      {required}  显示的部分
 }
 */
historyState.switchPage = function(options){
    var hideDiv = options.hideDiv;
    var showDiv = options.showDiv;
    var state = options.state || {};
    var title = options.title || '';
    var url = options.url || '';
    //隐藏当前页面，并添加进新页面
    hideDiv.hide();
    showDiv.show();
    //如果支持的话就使用新特性，不支持的话，就不处理了
    if(this.ifSupport()){
        var popFunc = function() {
            hideDiv.show();
            showDiv.hide();
            //手动清掉了这个方法
            window.removeEventListener("popstate",popFunc);
        };
        window.addEventListener("popstate",popFunc);
        window.history.pushState(state,title,url);
    }
};

module.exports = historyState;
