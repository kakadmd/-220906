<template>
  <div>
    <ArticleItem
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></ArticleItem>
  </div>
</template>

<script>
// 发送请求 拿到当前文章的详情数据
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'articleList',
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      // 时间戳的三种方法
      // new Date().valueof()
      // Date.now()
      // +new Date()
      try {
        const { data } = await getArticles(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
      } catch (error) {
        const status = error.response?.status
        // js错误 400上抛中文，507原封不动上抛
        if (!error.response || status === 507) {
          // 如果err.response不存在或者为507
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style></style>
