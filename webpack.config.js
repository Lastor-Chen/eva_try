const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  devtool: 'cheap-module-source-map', // 處理 sourcemap 的方式, 使 Devtools 不要跳出 map 相關黃字
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'), // 處理 node path module
      url: require.resolve('url/'), // 處理 node url module
    },
  },
}