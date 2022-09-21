<template>
  <div>
    <!-- 更改个人名字的标题 -->
    <van-nav-bar
      title="更改昵称"
      left-text="取消"
      right-text="保存"
      @click-left="$emit('popup-showOne')"
      @click-right="UploadUserMessage"
    />
    <!-- 更改个人名字的内容 -->
    <div class="bigBox">
      <!-- maxlength限制文本域里面输入的文字字数 -->
      <textarea
        class="fillName"
        v-model.trim="message"
        maxlength="11"
      ></textarea>
      <div class="wordCount">
        <span>{{ num }}/11</span>
      </div>
    </div>
  </div>
</template>

<script>
import { UploadUserMessageAPI } from '@/api'
export default {
  name: 'ChangeName',
  props: {
    uname: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: this.uname
    }
  },
  mounted() {
    this.UploadUserMessage()
  },
  methods: {
    async UploadUserMessage() {
      // this.$emit('popup-showTwo')
      console.log(UploadUserMessageAPI(this.message))
      // console.log(await UploadUserMessageAPI(this.message))
      if (this.message.trim().length === 0) {
        this.$toast('输入不能为空')
      }
      try {
        await UploadUserMessageAPI({ name: this.message })
        // this.$toast('更新成功')
        this.$emit('popup-showOne', this.message)
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  },
  watch: {
    uname() {}
  },
  computed: {
    num() {
      return this.message.length
    }
  }
}
</script>

<style lang="less" scoped>
.bigBox {
  width: 750px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :deep(.fillName) {
    width: 684px;
    min-height: 1.6rem;
    border: none;
    resize: none;
    // margin-left: 3.5%;
    //  initial(默认)关键字 inherit(继承)关键字  unset是关键字initial和inherit的组合
    font-size: unset;
    font-size: 35px;
    font-family: monospace;
  }
  .wordCount {
    position: relative;
    width: 684px;
    height: 32px;
    font-size: 24px;
    span {
      position: absolute;
      right: 0;
    }
  }
}
</style>
