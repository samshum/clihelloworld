module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // 增加elment-ui定制化组件配置, 这里跟官方文档不同步，需要在 babel-plugin-component 的GIT项目文档找
    ['@babel/preset-env', {'modules': false}]
  ],
  // 增加elment-ui定制化组件配置
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
