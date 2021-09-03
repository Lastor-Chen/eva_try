const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new CleanWebpackPlugin(), // 用於 build 前, 清空 build 資料夾
    new CopyPlugin({ // copy 不需要 webpack 打包的檔案至 build 資料夾
      patterns: [
        { from: '../public/index.html', to: '' },
        { from: '../public/style.css', to: '' },
      ],
    }),
  ],
  devtool: 'cheap-module-source-map', // 處理 sourcemap 的方式, 使 Devtools 不要跳出 map 相關黃字
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'), // 處理 node path module
      url: require.resolve('url/'), // 處理 node url module
    },
  },
}