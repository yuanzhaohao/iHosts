const os = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

exports.extractCSS = new ExtractTextPlugin('[name].css', {
  allChunks: true
});

exports.happypackJS = new HappyPack({
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

exports.happypackLESS = new HappyPack({
  id: 'lessHappy',
  threadPool: happyThreadPool,
  loaders: [ 'css-loader', 'less-loader' ]
});

exports.happypackCSS = new HappyPack({
  id: 'cssHappy',
  threadPool: happyThreadPool,
  loaders: [
    'css-loader',
    { loader: 'postcss-loader', options: { plugins: () => [require('autoprefixer')] } }
  ]
});

exports.uglifyJS = new webpack.optimize.UglifyJsPlugin({
 comments: false,
 compress: {
   warnings: false
 }
});
exports.mergingPlugin = new webpack.optimize.AggressiveMergingPlugin();

exports.compressionCode = new CompressionWebpackPlugin({ //gzip 压缩
  asset: '[path].gz[query]',
  algorithm: 'gzip',
  test: new RegExp(
    '\\.(js|css|less)$'
  ),
  threshold: 10240,
  minRatio: 0.8
});
