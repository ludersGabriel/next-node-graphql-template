module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver', {
        alias: {
          '@controllers': './src/controllers',
          '@utils': './src/utils',
          '@components': './src/components',
          '@src': './src'
        }
      },

    ],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "babel-plugin-transform-typescript-metadata"
  ],
  ignore: [
    './src/tests'
  ]
}
