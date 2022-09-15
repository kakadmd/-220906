<template>
  <div>
    <!-- 左滑进入 -->
    <!-- mode:  out-in 先出再进  in-out 先进后出 -->
    <!-- transition  mode 都是vue原生的-->
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
