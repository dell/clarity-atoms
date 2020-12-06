const presets = [
  ['@babel/typescript', { jsxPragma: 'h' }],
  '@babel/preset-env'
];

const plugins = [
  ['@babel/plugin-proposal-nullish-coalescing-operator'],
  ['@babel/plugin-proposal-optional-chaining'],
  ['@babel/plugin-transform-react-jsx', {
    runtime: 'automatic',
    importSource: 'preact',
  }]
];


module.exports = { presets, plugins };
