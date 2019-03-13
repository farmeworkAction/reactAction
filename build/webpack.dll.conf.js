const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: [
      'antd',
      'prop-types',
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
        // DllPlugin的name属性需要和libary保持一致
        name: '[name]',
        path: path.join(__dirname, '../dist', '[name]-manifest.json'),
        // context需要和webpack.config.js保持一致
        context: __dirname,
    }),
  ],
}
