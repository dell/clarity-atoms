const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const remarkCodeImport = require('remark-code-import');

const renderer = `
  import { mdx as h } from '@mdx-js/preact';

  const mdx = function (name, props, ...children) {

    if (name === 'inlineCode') {
      return h('inline-code', props, ...children);
    }

    return h(name, props, ...children);
  };
`;


module.exports = {

  context: __dirname,

  mode: 'development',
  devtool: 'source-map',

  entry: {
    site: ['./site/style.ts', './site/main.ts']
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
            loader: 'babel-loader',
            // Temporary, consider using nested babel configuration till MDX support new JSX functions
            options: {
              plugins: [
                ['@babel/plugin-transform-react-jsx', {
                  runtime: 'classic'
                }]
              ]
            }
          },
          {
            loader: '@mdx-js/loader',
            options: {
              renderer,
              remarkPlugins: [remarkCodeImport]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Clarity Atoms - Sensible components for Enterprise Apps'
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
