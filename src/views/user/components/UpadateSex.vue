<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      confirm-button-text="保存"
      visible-item-count="2"
      :default-index="localGender"
    />
  </div>
</template>

<script>
import { UploadUserMessageAPI } from '@/api'
export default {
  props: {
    gender: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: 0
    }
  },
  mounted() {
    this.localGender = this.gender
  },
  methods: {
    async onConfirm(index) {
      try {
        // this.$toast('保存')
        // console.log(index) // 男女
        index === '男' ? (this.localGender = 0) : (this.localGender = 1)
        await UploadUserMessageAPI({ gender: this.localGender })
        console.log(this.localGender)
        this.$emit('popup-showTwo', this.localGender)
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    onCancel() {
      this.$emit('popup-showTwo')
      this.$toast('取消')
    }
  }
}
</script>

<style></style>
