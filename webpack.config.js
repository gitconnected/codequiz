const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/js/App.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './',
    port: 8080,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      Data: path.resolve(__dirname, './data/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
