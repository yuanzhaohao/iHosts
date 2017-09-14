const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      loader: 'babel-loader'
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        { loader: 'less-loader', options: { strictMath: true, noIeCompat: true } }
      ]
    }, {
      test: /\.css$/,
      loader: 'css-loader'
    }]
  }
};
