<template>
  <div>
    <div>
      <van-share-sheet v-model="showShare" :options="options" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showShare: this.show,
      options: [
        {
          name: '名称',
          icon: 'https://img01.yzcdn.cn/vant/custom-icon-fire.png'
        },
        {
          name: '名称',
          icon: 'https://img01.yzcdn.cn/vant/custom-icon-light.png'
        },
        {
          name: '名称',
          icon: 'https://img01.yzcdn.cn/vant/custom-icon-water.png'
        }
      ]
    }
  }
}
</script>

<style></style>
