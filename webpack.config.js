const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

  context: __dirname,

  mode: 'development',
  devtool: 'eval',

  entry: {
    site: './site/main.ts'
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Clarity Atoms'
    })
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js'],
    mainFields: ['browser', 'module', 'main']
  },

  devServer: {
    contentBase: './dist',
    port: 8080,
    historyApiFallback: true
  }

};
