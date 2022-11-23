const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  // 方式一 
  // devServer:{
  //   proxy: 'http://127.0.0.1:5050/' // 先要启用 public/json/ 的文件服务器
  // }
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5050/',
        // 重要：原则优先地本服务器，如果本地服务器存在的情况下，则不向代理服务器请求数据
        // 路径重写，将当前路径前缀为设置为空, 效果如下
        //    http://127.0.0.1:5050/api =-> http://127.0.0.1:5050/

        //pathRewrite: {'^/api': ''}, 
        ws: true,           // 支持websocket
        changeOrigin: true  // 是否变更请求头来源信息host值
      }
    }
  }
})