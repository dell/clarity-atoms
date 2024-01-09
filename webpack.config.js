const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const renderer = `
  import { mdx as h } from '@mdx-js/preact';

  const mdx = function (name, props, ...children) {

    if (name === 'inlineCode') {
      return h('inline-code', props, ...children);
    }

    return h(name, props, ...children);
  };
`;

const SITE_DIST = path.join(__dirname, './dist/site');

module.exports = {

  context: __dirname,

  mode: 'development',
  devtool: 'source-map',

  entry: {
    site: ['./site/style.ts', './site/main.ts']
  },

  output: {
    path: SITE_DIST,
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
              renderer
            }
          },
          {
            loader: path.resolve(__dirname, 'webpack.helper.js')
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './site/index.html'
    })
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.jsx', '.js'],
    mainFields: ['browser', 'module', 'main'],
    alias: {
      'clarity-atoms': path.resolve(__dirname, 'src'),
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },

  devServer: {
    static: SITE_DIST,
    port: 8080,
    historyApiFallback: true
  }

};
