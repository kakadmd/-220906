<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @load：触底的时候触发load事件 -->
    <!-- offset:规定滚动条和底部距离多少的时候触发loda事件，默认是300px -->
    <!-- immediate-check:初渲染的时候是否执行load事件，默认值是true -->
    <!-- v-model去绑定loading v-model="loading" -->
    <!-- loading如果为true，load事件不会被触发 -->
    <!-- loading如果为false，load事件会被触发 -->
    <!-- loading 会在load事件执行后，会被van-list组件自动设置为true-->
    <!-- finished：Boolean  false：load事件会被触发  true：load事件不会被触发，并且显示finsish-text的文本-->

    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticles">
      <van-list
        v-model="loading"
        @load="getNextPageArticles"
        offset="100"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多文章了~"
        :error.sync="error"
        error-text="请求失败，请点击重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
          @click.native="detailsNews(item.art_id)"
        ></ArticleItem>
        <!-- 事件修饰符 .native ——> 给组件内根标签添加原生click事件 -->
      </van-list>
    </van-pull-refresh>
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
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
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
        // console.log(data)
        this.articles = data.data.results

        // 保存下一页的时间戳，用于分页
        // console.log(data.data.pre_timestamp) 下一页的时间戳
        this.preTimestamp = data.data.pre_timestamp
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
    },
    async getNextPageArticles() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }

        // 1.发送请求获取下一页文章
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果是下滑加载，将数据放到最后
        // 如果是下拉刷新，将数据放在最前
        // 2.添加到articles
        // 如果是下滑加载
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }

        // 3.更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // 错误进行处理
        this.error = true
      } finally {
        // finally语句最后一定会执行
        // 4.更改loading
        this.loading = false
        this.refreshLoading = false
      }
    },
    detailsNews(id) {
      this.$router.push({
        name: 'details',
        params: { id: id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 如何让一个盒子有自己的滚动条
// 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // 调滚动条样式
  // &  代表当前元素他爹
  // ::-webkit-scrollbar 代表滚动条的滚动槽
  // ::-webkit-scrollbar-thumb 代表滚动的滑块
  &::-webkit-scrollbar {
    width: 20px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: cadetblue;
    border-radius: 20px;
  }
}
</style>
