<template>
  <div>
    <!-- 搜索框 -->
    <!-- 这个用form包起来是为了让苹果输入法弹出键盘时显示确认键（action不能为空） -->
    <form action="/">
      <van-search
        class="btn"
        v-model.trim="keyWords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="$router.push('/')"
        @search="onSearch"
        @focus="isShowSearchResults = false"
      />
      <!-- 输入框获得焦点触发@focus事件：当isShowSearchResults 为false时，就是显示搜索结果为假的时候 -->
    </form>

    <!-- 搜索历史、建议、结果 -->
    <!-- component 动态组件 用is绑定 -->
    <!-- <SearchHistory></SearchHistory>
    <SearchSuggest></SearchSuggest>
    <SearchResult></SearchResult> -->

    <!-- 通过componentName去控制到底显示哪个组件 -->
    <component
      :is="componentName"
      :keyWords="keyWords"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
// class和style这两个属性是特殊的
//  - 在传属性的时候 vue会自动帮你把class和style合并到组件的根节点中
import SearchHistory from './commponents/SearchHistory.vue'
import SearchResult from './commponents/SearchResult.vue'
import SearchSuggest from './commponents/SearchSuggest.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggest
  },
  data() {
    return {
      keyWords: '',
      isShowSearchResults: false
    }
  },
  computed: {
    ...mapState(['histories']),
    // 计算属性依赖的属性发生变化时会重新计算
    componentName() {
      // 搜索历史显示条件：搜索框的值为空
      // 搜索建议显示条件：搜索框有值，并且不渲染搜索结果
      // 搜索结果显示条件：搜索框有值 触发搜索时

      // 如果搜索框内容为空 显示搜索历史
      if (this.keyWords === '') {
        return 'SearchHistory'
      }

      // 如果键盘按下回车键会触发search事件
      // 会让isShowSearchResults变为true，然后显示搜索结果
      if (this.isShowSearchResults) {
        return 'SearchResult'
      }

      // 如果搜索框不为空 并且没有按下回车就显示搜索建议
      return 'SearchSuggest'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    // 如果按下回车 触发search事件让isShowSearchResults变为true
    onSearch(keyWords) {
      // 把keyWords关键词存起来
      // 1.用户手动敲回车 2.点击了搜索建议
      // 存储搜索历史

      // 去重
      //  - 1.获取没有去重的数组  2.放在new Set(arr) 3.[...set](因为通过new Set出来的是一个对象不是数组，v-for的是数组，所以把对象里面的东西通过...解构出来)
      const distinctHistories = [...new Set([keyWords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)

      this.keyWords = keyWords
      this.isShowSearchResults = true
    }
  }
}
</script>

<style lang="less" scoped>
// 这个是属性选择器 [role='button']
// [role='button'] calc（计算属性） footer标签 header标签  这都是c3新增的
.btn {
  color: #fff;
}
</style>
