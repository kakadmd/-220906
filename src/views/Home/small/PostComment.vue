<template>
  <div>
    <div class="total">
      <van-field
        class="filed"
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button class="btn" @click="articleComments"
        ><span>发布</span></van-button
      >
    </div>
  </div>
</template>

<script>
import { reviewArticleAPI } from '@/api'
export default {
  props: {
    art: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    // 对文章进行评论
    async articleComments() {
      try {
        const { data } = await reviewArticleAPI({
          target: this.art.art_id,
          content: this.message
        })
        // console.log(data.data.new_obj)
        // console.log(data)
        this.$emit('addComments', data.data.new_obj)
        this.$parent.$parent.isShowComment = false
        // console.log(this.message)
        this.message = ''
      } catch {
        if (this.message === '') {
          this.$toast.fail('评论不能为空')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.total) {
  display: flex;
  // justify-content: center;
  align-items: center;
  padding: 32px 0 32px 28px;
  .filed {
    width: 596px;
    height: 176px;
    background-color: #f5f7f9;
    margin: 0;
  }
  .btn {
    width: 120px;
    height: 88px;
    text-align: center;
    border: none;
    color: #6ba3d8;
    span {
      font-size: 32px;
      display: block;
      width: 80px;
      height: 40px;
    }
  }
}
</style>
