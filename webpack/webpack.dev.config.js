const path = require('path');
const plugins = require('./plugins');

module.exports = {
  entry: {
    index: './src/index.js',
    // lib: [
    //   'react', 'react-dom', 'antd', 'codemirror'
    // ]
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      loader: 'HappyPack/loader?id=jsHappy',
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      use: plugins.extractCSS.extract('happypack/loader?id=lessHappy')
    }, {
      test: /\.css$/,
      use: plugins.extractCSS.extract('happypack/loader?id=cssHappy')
    }]
  },
  plugins: [
    plugins.extractCSS,
    plugins.happypackJS,
    plugins.happypackLESS,
    plugins.happypackCSS,
  ],
  node: {
    fs: 'empty'
  },
  target: 'electron'
};
