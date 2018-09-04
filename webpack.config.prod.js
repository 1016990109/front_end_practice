const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const options = {
  plugins: [
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
}

//npm 包分析工具
if (process.env.npm_config_report) {
  options.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(common, options)
