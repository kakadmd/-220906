<template>
  <div>
    <van-nav-bar
      class="navBar"
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
    />
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
:deep(.navBar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
    font-size: 32px;
  }
  .van-icon-arrow-left {
    font-size: 24px;
    color: #fff;
  }
}
</style>
