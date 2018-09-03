const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(common, {
  plugins: [
    //npm 包分析工具
    new BundleAnalyzerPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: ['console.log']
      },
      sourceMap: true
    }),

    new webpack.optimize.ModuleConcatenationPlugin()
  ],

  devtool: 'source-map'
})
