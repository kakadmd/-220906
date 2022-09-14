<template>
  <div class="channelEdit">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="mini"
        style="color: red; border-color: red"
        class="btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>

    <!-- 频道 -->
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          :class="{ active: item.name === '推荐' }"
          @click="handleMyChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道" />

    <!-- 频道 -->
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
          @click="$emit('add-channel',item)"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: Array
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      //   console.log(await getAllChannelsAPI())
      const { data } = await getAllChannelsAPI()
      this.allChannels = data.data.channels
    },
    handleMyChannel(item, index) {
      const { name, id } = item
      // 如果是编辑并且不是推荐才删除频道
      if (this.isEdit && name !== '推荐') {
        // 删除频道
        // console.log('删除', name)
        this.$emit('del-channel', id)
      } else {
        // 1.关闭弹窗

        // 2.切换频道
        // 把点击到的index传送给父组件indx.vue，触发父组件的自定义事件
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    // 推荐频道：所有频道减去我的频道
    recommendChannels() {
      // filter返回值是一个新数组 return true 当前项保留
      return this.allChannels.filter((allChannelItem) => {
        // 我的频道数组里面，看一下，有没有allChannelItem,有return false
        // 在所有频道里面寻找这一项
        // 如果在我的频道里面的这一项存在 就让所有频道里面的item的id=这一项的id
        // 等于之后会返回true
        // 返回true是保留这一项的 但是已经在我的频道里面存在了就不应该在推荐频道里面保留
        // 应该取反
        const target = this.myChannels.find(
          (myChannelsItem) => myChannelsItem.id === allChannelItem.id
        )
        return !target
      })
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channelEdit {
  padding-top: 92px;
  :deep(.btn) {
    // postcss插件无法将行内样式px转为rem
    width: 100px;
    font-size: 24px;
  }
  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
  }
  // 我的频道
  .my-pannel {
    // 编辑按钮居中
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    // 关闭按钮样式
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__content {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  :deep(.van-icon-cross) {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25px;
    transform: translate(20%, -35%);
    border: 0.02667rem solid #000;
    border-radius: 50%;
    text-align: center;
    line-height: 0.32rem;
  }
  // 推荐频道
  .recommend-pannel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
