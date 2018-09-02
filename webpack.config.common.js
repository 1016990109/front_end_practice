const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  // 配置页面入口js文件
  entry: {
    index: ['./src/index.js'],
    polyfill: './src/polyfill.js'
  },

  // 配置打包输出相关
  output: {
    // 打包输出目录
    path: resolve(__dirname, './dist'),

    // 入口js的打包输出文件名
    filename: `[name].${isDev ? '' : '[chunkhash:8]'}.js`,

    publicPath: '',

    //chunk文件输出
    chunkFilename: `[name].${isDev ? '' : '[chunkhash:8]'}.chunk.js`
  },

  module: {
    /*
     配置各种类型文件的加载器, 称之为loader
     webpack当遇到import ... 时, 会调用这里配置的loader对引用的文件进行编译
     */
    // loaders: [],

    rules: [
      {
        test: require.resolve('zepto'),
        use: ['exports-loader?window.Zepto', 'script-loader']
      },
      {
        /*
         使用babel编译ES6/ES7/ES8为ES5代码
         使用正则表达式匹配后缀名为.js的文件
         */
        test: /\.js$/,

        // 排除node_modules目录下的文件, npm安装的包不需要编译
        exclude: /node_modules/,

        /*
         use指定该文件的loader, 值可以是字符串或者数组.
         这里先使用eslint-loader处理, 返回的结果交给babel-loader处理. loader的处理顺序是从最后一个到第一个.
         eslint-loader用来检查代码, 如果有错误, 编译的时候会报错.
         babel-loader用来编译js文件.
         */
        use: ['babel-loader', 'eslint-loader']
      },

      {
        // 匹配.html文件
        test: /\.html$/,
        /*
         使用html-loader, 将html内容存为js字符串, 比如当遇到
         import htmlString from './template.html'
         template.html的文件内容会被转成一个js字符串, 合并到js文件里.
         */
        use: 'html-loader'
      },

      {
        // 匹配.css文件
        test: /\.css$/,

        /*
         先使用css-loader处理, 返回的结果交给style-loader处理.
         css-loader将css内容存为js字符串, 并且会把background, @font-face等引用的图片,
         字体文件交给指定的loader打包, 类似上面的html-loader, 用什么loader同样在loaders对象中定义, 等会下面就会看到.
         */
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000 /* 图片大小小于1000字节限制时会自动转成 base64 码引用*/
            }
          },

          {
            loader: 'image-webpack-loader',
            options: {
              disable: isDev, //develop 模式关闭图片压缩
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
              // the webp option will enable WEBP
              //safari 不支持webp
              // webp: {
              //   quality: 75
              // }
            }
          }
        ]
      }
    ]
  },

  /*
   配置webpack插件
   plugin和loader的区别是, loader是在import时根据不同的文件名, 匹配不同的loader对这个文件做处理,
   而plugin, 关注的不是文件的格式, 而是在编译的各个阶段, 会触发不同的事件, 让你可以干预每个编译阶段.
   */
  plugins: [
    new CleanWebpackPlugin(['dist']),
    /*
     html-webpack-plugin用来打包入口html文件
     entry配置的入口是js文件, webpack以js文件为入口, 遇到import, 用配置的loader加载引入文件
     但作为浏览器打开的入口html, 是引用入口js的文件, 它在整个编译过程的外面,
     所以, 我们需要html-webpack-plugin来打包作为入口的html文件
     */
    new HtmlWebpackPlugin({
      /*
       template参数指定入口html文件路径, 插件会把这个文件交给webpack去编译,
       webpack按照正常流程, 找到loaders中test条件匹配的loader来编译, 那么这里html-loader就是匹配的loader
       html-loader编译后产生的字符串, 会由html-webpack-plugin储存为html文件到输出目录, 默认文件名为index.html
       可以通过filename参数指定输出的文件名
       html-webpack-plugin也可以不指定template参数, 它会使用默认的html模板.
       */
      template: './src/index.html'
    }),

    //让moduleId不变，这样第三方库vendor的hash值才不变
    new webpack.HashedModuleIdsPlugin(),

    //提取公共的库，polyfill单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['index'],
      minChunks: module => {
        return module.resource && /node_modules/.test(module.resource)
      }
    }),

    //防止代码改动而导致vendor的hash值发生变化
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    })
  ]
}
