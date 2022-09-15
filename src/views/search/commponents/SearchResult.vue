<template>
  <div class="results">
    <!-- 实现下滑加载的功能用van-list包裹 -->
    <!-- load事件是小于offset的时候会触发 并将loading设置为true-->
    <van-list
      @load="getResults"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleId: item.art_id
            }
          })
        "
      />
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keyWords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      per_page: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // 测试代码
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }

        // 发送请求
        const { data } = await getResultsAPI(
          // 每一次调用page++
          this.page++,
          this.per_page,
          this.keyWords
        )
        // console.log(data)
        const result = data.data.results
        if (result.length === 0) {
          this.finished = true
        }
        // 保存数据
        // this.results.push(data.data.results)
        // 这个不是替换 是追加
        this.results = [...this.results, ...result]
      } catch {
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.results {
  height: calc(100vh - 108px);
  overflow: overlay; // overlay和auto用法基本一致，overlay滚动条不占空间
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
    border-radius: 40px;
  }
}
</style>
