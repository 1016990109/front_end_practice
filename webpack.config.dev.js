const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.common')

module.exports = merge(common, {
  cache: true,
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'cheap-module-eval-source-map',

  /*
   配置开发时用的服务器, 让你可以用 http://127.0.0.1:8080/ 这样的url打开页面来调试
   并且带有热更新的功能, 打代码时保存一下文件, 浏览器会自动刷新. 比nginx方便很多
   如果是修改css, 甚至不需要刷新页面, 直接生效. 这让像弹框这种需要点击交互后才会出来的东西调试起来方便很多.
   */
  devServer: {
    // 配置监听端口, 因为8080很常用, 为了避免和其他程序冲突, 我们配个其他的端口号
    port: 8100,

    //启用gzip压缩
    compress: true,

    //启用HMR(Hot Module Replace)
    hot: true,

    //编译失败不刷新页面
    hotOnly: true,

    //https提供资源
    https: true,

    //启动后打开浏览器
    open: true,

    //默认打开页面
    openPage: 'foo',

    //发生错误时重定向
    historyApiFallback: true,

    contentBase: resolve(__dirname, './src')
  }
})
