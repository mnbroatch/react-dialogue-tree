const path = require('path')

module.exports = ({ config, mode }) => {
  config.resolve.alias['react-dialogue-tree'] = mode === 'PRODUCTION'
    ? path.resolve(__dirname, '../dist/react-dialogue-tree.min.js')
    : path.resolve(__dirname, '../src/index.js')

  config.resolve.fallback = {
    fs: false,
    path: false,
  }
  return config
}
