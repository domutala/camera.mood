const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.merge(common, {
  mode: 'production',
  devtool: 'source-map',

  entry: './src/camera.ts',
  output: {
    filename: 'camera.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'camera',
    libraryTarget: 'umd'
  }
});
