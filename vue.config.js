let path = require('path')
let dirname = path.dirname(__dirname);

let fileFormat = [];
if (process.platform == 'win32') {
  fileFormat = [
    `\\zb-sign\\src`,
    '\\zb-sign\\test',
    '\\zb-sign\\node_modules\\element-ui\\src',
    '\\zb-sign\\node_modules\\element-ui\\packages',
    '\\zb-sign\\node_modules\\@babel\\preset-env'
  ]
} else {
  fileFormat = [
    '/zb-sign/src',
    '/zb-sign/test',
    '/zb-sign/node_modules/element-ui/src',
    '/zb-sign/node_modules/element-ui/packages',
    '/zb-sign/node_modules/@babel/preset-env'
  ]
}

module.exports = {
  //因为饿了么不支持ie 所以需要转成
  // transpileDependencies: ['element-ui', 'bootstrap', "bootstrap-vue"],
  chainWebpack: config => {
    config.module
      .rule('compile')
      .test(/\.js$/)
      .include
      .add(dirname + fileFormat[0])
      .add(dirname + fileFormat[1])
      .add(dirname + fileFormat[2])
      .add(dirname + fileFormat[3])
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          [dirname + fileFormat[4], {modules: false}]
        ]
      })
  },
  // options...
  // 基本路径
  baseUrl: './',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: {
    proxy: "https://www.youchent.com"
  },
};
