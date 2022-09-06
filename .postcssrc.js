// 所有的postcss的插件都是一个函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
  // 插件
  plugins: [
    pxToRem({
      // rootValue 根节点字体大小
      // 如果是vant 按照37.5转 如果是自己写的代码按照75转
      rootValue: ({ file }) => {
        // file 当前编译的css的文件路径
        // const { file } = module
        return /vant/.test(file) ? 37.5 : 75
      },
      propList: ['*'] // 所有属性都转为rem
    })
  ]
}
