<template>
  <div>
    <!-- 搜索历史标题 -->
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />
        <div v-else>
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span>
          &nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索历史 -->
    <van-cell
      v-for="item in histories"
      :key="item"
      :title="item"
      @click="!isEdit && $emit('change-keywords',item)"
    >
      <template #extra>
        <!-- 点击的不等于这个item就保留 -->
        <van-icon
          name="close"
          v-show="isEdit"
          @click="
            $store.commit(
              'SET_HISTORIES',
              histories.filter((val) => item !== val)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  }
}
</script>

<style></style>
