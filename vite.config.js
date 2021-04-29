const PATH = require('path')

module.exports = {
  build: {
    lib: {
      entry: PATH.resolve(__dirname, 'src/index.js'),
      name: 'HTMLElementStyle'
    }
  }
}