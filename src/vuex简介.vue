<template>
  <div>
    <!-- <router-view></router-view> -->
    <h3>{{ number }}</h3>
    <button @click="SET_COUNT(10)">点击number</button>
    <h3>number的十倍{{ bigNum }}</h3>
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

// mapState ————> 将vuex里面的state映射到computed
// 使用：
//  - 引入mapState 按需引入
//  参数：['映射的属性']

// mapGetters ————> 将vuex里面的getters映射到computed
// mapMutations ————> 将vuex里面的mutations方法 映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
console.log(mapState(['number']))
export default {
  methods: {
    // add() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    // number() {
    //   return this.$store.state.number
    // }
    // 把number从mapState里面解构出来
    //  ...mapState(展开运算)
    ...mapState(['number']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped></style>
