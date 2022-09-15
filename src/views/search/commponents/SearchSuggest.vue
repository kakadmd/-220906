<template>
  <div>
    <van-cell
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 使用lodash进行防抖处理

// map
//  - 返回一个新数组 长度和原数组长度一致 函数的返回值新数组的那一项的值

// 动态正则
//  - /Anglar/ig字面量形式的正则，不能动态生成正则的内容
//  - new RegExp（字符串，修饰符'ig'）

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数第一个参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { debounce } from 'lodash'
import { getSuggestionsAPI } from '@/api'
export default {
  props: {
    keyWords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keyWords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  computed: {
    highLightSuggestions() {
      const reg = new RegExp(this.keyWords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          // match是匹配上的数 有可能大写字母也有可能小写字母
          (match) => `<span style="color:red;">${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keyWords)
        // console.log(data)
        // this.suggestions = data.data.options.filter((item) => Boolean(item))
        // filter(Boolean)可以把数组中的假值过滤掉
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
