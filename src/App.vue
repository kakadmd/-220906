<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
//  1. 下载vant
//   Vue 2 项目，安装 Vant 2：yarn add vant@latest-v2 -S
//  2.在main.js里面引入vant和组件
//    - main.js
//  3.测试

//  rem适配
//  1.让rem动起来
//     使用一个插件（包）lib-flexible
//   yarn add amfe-flexible / npm i amfe-flexible

//  2.盒子使用rem
//   - 自动识别css中的px并自动转成rem 要用post-css

//   post-css css的预处理器
//    - postcss 自己能干的事很少，下载插件
//     —— 下载 yarn add postcss-pxtorem
//     —— 告诉postcss，我要使用这个插件，新建一个文件 .postcssrc.js
export default {
}
</script>

<style scoped>
  .box {
    width: 2rem;
    height: 2rem;
    background-color: aqua;
  }
</style>
