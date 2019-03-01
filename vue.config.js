// vue.config.js
const path = require("path");
module.exports = {
  // 选项...
  devServer: {
    open: true
  },
  configureWebpack: {
    // 配置别名
    resolve: {
      alias: {
        components: path.resolve(__dirname, "./src/components")
      }
    }
  }
};
