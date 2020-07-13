const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.merge(common, {
  mode: 'production',

  entry: './src/camera.ts',
  output: {
    filename: 'camera.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
});
