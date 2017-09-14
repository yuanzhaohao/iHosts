const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].css', {
  allChunks: true
});
const happypackJS = new HappyPack({
  id: 'jsHappy',
  cache: true,
  threadPool: happyThreadPool,
  loaders: [{
    path: 'babel-loader',
    query: {
      cacheDirectory: '.webpack_cache',
      presets: [
        'es2015',
        'react'
      ]
    }
  }]
});

const happypackLESS = new HappyPack({
  id: 'lessHappy',
  threadPool: happyThreadPool,
  loaders: [ 'css-loader', 'less-loader' ]
});
const happypackCSS = new HappyPack({
  id: 'cssHappy',
  threadPool: happyThreadPool,
  loaders: [
    'css-loader',
    { loader: 'postcss-loader', options: { plugins: () => [require('autoprefixer')] } }
  ]
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      loader: 'HappyPack/loader?id=jsHappy',
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      use: extractCSS.extract('happypack/loader?id=lessHappy')
    }, {
      test: /\.css$/,
      use: extractCSS.extract('happypack/loader?id=cssHappy')
    }]
  },
  plugins: [
    extractCSS,
    happypackJS,
    happypackLESS,
    happypackCSS,
  ]
};
