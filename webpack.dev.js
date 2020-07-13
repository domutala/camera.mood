const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

console.log(merge);

module.exports = merge.merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',

  entry: './test/index.ts',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  devServer: {
    contentBase: './build'
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'camera.mood'
    })
  ]
});
