const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

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
const uglifyJS = new webpack.optimize.UglifyJsPlugin({
 comments: false,
 compress: {
   warnings: false
 }
});
const compressionCode = new CompressionWebpackPlugin({ //gzip 压缩
  asset: '[path].min[query]',
  algorithm: 'gzip',
  filename: function(name) {
    if (name.indexOf('.js.min') > -1) {
      return name.replace('.js.min', '.min.js');
    }
    if (name.indexOf('.css.min') > -1) {
      return name.replace('.css.min', '.min.css');
    }
    return name;
  },
  test: new RegExp(
    '\\.(js|css|less)$'
  ),
  threshold: 10240,
  minRatio: 0.8
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
    uglifyJS,
    // compressionCode,
  ]
};