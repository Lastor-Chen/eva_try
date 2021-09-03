# eva_try
試用 [Eva.js](https://eva-engine.gitee.io) 製作簡單內容, 以及研究 Webpack 打包

於 canvas 引入一張愛心圖片, 左右循環位移動畫, click 圖片有點擊事件<br>
[preview link](https://lastor-chen.github.io/eva_try/)

Eva.js 教學原帖:
[所有前端都要看的2D游戏化互动入门基础知识](https://juejin.cn/post/6953511821420527630#heading-18)

## Eva.js memo
- 阿里巴巴、淘寶技術團隊釋出的框架, 用於互動式 2D Web Game 開發
- 將核心、渲染、圖片、動畫...等, 拆分為各個模塊, 使用時僅需引入需要的, 不用拉一大包
- 這陣子才開源出來, 還很新, 討論數少, 容易採坑
- 目前官方釋出的 demo 都是局部模塊的範例, 尚無完整小遊戲的案例
- 用起來蠻舒服的, 整體架構對於有類似框架經驗的人來說應該很好理解
- 預設用戶使用 React or Vue 這類框架, 如果沒用, 得自己手動做 webpack 處理, 或是用 CDN
- 官方有 webpack 腳手架 [start-demo](https://github.com/eva-engine/start-demo)
- 官方文件沒有把所有 CDN 路徑列出來, 但可根據命名慣性推導出其他模塊的路徑
  - 例如 `plugin-renderer` 模塊如下, 其他模塊僅需將模塊名替換掉
  - `npm i @eva/plugin-renderer`
  - `https://unpkg.com/@eva/plugin-renderer@1.1.x/dist/EVA.plugin.renderer.min.js`
- 官方文件沒說明, 但 npm 引入 `plugin-renderer` 時, 需一併安裝 `renderer-adapter` 模塊
- 官方文件沒說明, CDN 使用時, 所有內容會裝在變數 `EVA` 裡面
- 各 plugin 模塊則放到同名屬性中 `EVA.plugin.renderer`

## Webpack memo
- Eva.js `plugin-renderer` 模塊依賴 pixi.js 進行渲染, 而 pixi.js 用 webpack 打包時有坑
- pixi.js 有使用 Node.js module `url` 與 `path`, webpack 需另外處理, build 回饋的 Error 有提示, 跟著做即可
  - `path` 需另外引入 npm 套件 `path-browserify`
  - `url` 需另外引入 npm 套件 `url`, 如果有使用 `webpack-dev-server`, 裡面有自帶
- webpack 打包後運行, Chrome 會跳出一堆 source-map 黃字警告, 需在 config 設定 `devtool` 屬性
- 如果不希望 production mode 也生成 source-map, 可以定義 config 的 `mode` 屬性為 `development`
- webpack build 與其他預處理器或編譯器一樣, 僅做單向輸出, 所以會出現不需要的殘留檔案, 可透過 `clean-webpack-plugi` 套件自動化移除
- `index.html` 這類不需要 webpack 打包, 但又需要一起放到輸出資料夾的檔案, 概念上可用 copy-paste 手動處理, 或用 `copy-webpack-plugin` 自動化操作