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
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      // loader: 'babel-loader',
      loader: 'HappyPack/loader?id=jsHappy',
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      use: extractCSS.extract([ 'css-loader', 'less-loader' ])
    }, {
      test: /\.css$/,
      use: extractCSS.extract([
        {
          loader: 'css-loader',
          query: { modules: true, sourceMaps: true }
        }, {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')] }
      }])
    }]
  },
  plugins: [
    extractCSS,
    happypackJS
  ]
};
