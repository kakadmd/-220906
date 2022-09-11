<template>
  <div>
    <!-- 搜索导航-->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button text="搜索" icon="search" round size="small" block />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <!-- 渲染的文章详情 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <span class="toutiao toutiao-gengduo"></span>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
export default {
  data() {
    return {
      active: 0,
      channelList: []
    }
  },
  components: {
    ArticleList
  },
  created() {
    this.getChannel()
  },
  // d ?? => 相当于 ||（或） ，常用于语句中
  // d ?. => 可选链操作符，?前面是undefined，那么不会往后取值
  methods: {
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        // console.log(data)
        this.channelList = data.data.channels
      } catch (err) {
        // js的错误，给程序员
        if (!err.response) {
          throw err
        } else {
          const status = err.response.status
          /*  // && 短路运算 前面为true 后面运行
          status === 507 && this.toast.fail('请刷新') */
          status === 507 ?? this.toast.fail('请刷新')
        }
        // axios的状态码为507 提示用户刷新
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
} /* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
