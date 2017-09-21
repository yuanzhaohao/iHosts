const os = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  extractCSS: new ExtractTextPlugin('[name].css', {
    allChunks: true
  }),

  happypackJS: new HappyPack({
    id: 'jsHappy',
    cache: true,
    threadPool: happyThreadPool,
    loaders: [{
      path: 'babel-loader',
      query: {
        cacheDirectory: '.webpack_cache',
        presets: [
          'es2015',
          'react',
          'stage-0'
        ]
      }
    }]
  }),

  happypackLESS: new HappyPack({
    id: 'lessHappy',
    threadPool: happyThreadPool,
    loaders: [ 'css-loader', 'less-loader' ]
  }),

  happypackCSS: new HappyPack({
    id: 'cssHappy',
    threadPool: happyThreadPool,
    loaders: [
      'css-loader',
      { loader: 'postcss-loader', options: { plugins: () => [require('autoprefixer')] } }
    ]
  }),

  uglifyJS: new webpack.optimize.UglifyJsPlugin({
   comments: false,
   compress: {
     warnings: false
   }
 }),

 mergingPlugin: new webpack.optimize.AggressiveMergingPlugin(),

 compressionCode: new CompressionWebpackPlugin({ //gzip 压缩
   asset: '[path].gz[query]',
   algorithm: 'gzip',
   test: new RegExp(
     '\\.(js|css|less)$'
   ),
   threshold: 10240,
   minRatio: 0.8
 })
};
