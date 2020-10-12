const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const renderer = `
  import { mdx as h } from '@mdx-js/preact';

  const mdx = function (name, props, ...children) {

    if (name === 'inlineCode') {
      return h('code', props, ...children);
    }

    return h(name, props, ...children);
  };
`;


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
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: '@mdx-js/loader',
            options: {
              renderer
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Clarity Atoms'
    })
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.jsx', '.js'],
    mainFields: ['browser', 'module', 'main'],
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },

  devServer: {
    contentBase: './dist',
    port: 8080,
    historyApiFallback: true
  }

};
