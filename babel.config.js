// babel.config.js
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@Core': './src/core'
          // Add other aliases as needed
        }
      }
    ]
  ]
};