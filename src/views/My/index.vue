<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登录状态的结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <!-- type 布局方式 -->
            <!-- align Flex 交叉轴对齐方式：可选值为 center bottom -->
            <!-- justify Flex 主轴对齐方式：
            可选值为 end center space-around space-between -->
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button round size="mini" class="editBtn"
                >编辑信息</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template#icon>{{ userInfo.art_count }}</template#icon>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template#icon>{{ userInfo.fans_count }}</template#icon>
            </van-grid-item>
            <van-grid-item text="关注">
              <template#icon>{{ userInfo.follow_count }}</template#icon>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template#icon>{{ userInfo.like_count }}</template#icon>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录状态的结构 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image
          width="1.76rem"
          height="1.76rem"
          :src="mobileSrc"
        ></van-image>
        <!-- <img src="../../assets/images/mobile.png" alt="" /> -->
        <div class="text">登录/注册</div>
      </div>
    </header>
    <!-- 主体结构 -->
    <main>
      <!-- clickable默认是false 但是你放到这里就是默认true了 -->
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon
            ><span class="toutiao toutiao-shoucang"></span
          ></template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon><span class="toutiao toutiao-lishi"></span></template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <!-- block是让按钮变成一个大块块 -->
      <van-button style="color: red" block v-if="isLogin" @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
// 把辅助函数引过来
import { mapGetters } from 'vuex'
import mobileSrc from '../../assets/images/mobile.png'
// 引入API
import { getUserInfoAPI } from '@/api'
export default {
  name: 'My',
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    /* logout() {
      this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
        .then(() => {
          // 确认走.then
          // on confirm
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // 取消走这里 用不到可以删掉
          // on cancel
        })
    } */
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        // 用户登录了之后再继续
        if (!this.isLogin) return

        const { data } = await getUserInfoAPI()
        console.log(getUserInfoAPI())
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        // 区分error
        // 1.js的错误 throw err 把错误抛出来
        // 2.axios导致的
        // js 400 507 给程序员提示，401提示用户重新登录（认证失败就是token两小时的期限过期需重新登录）
        if (err.response && err.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登陆')
        } else {
          throw err
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  // 100vh 就是一整个屏幕
  height: 100vh;
  background-color: #f5f7f9;

  .link {
    margin: 10px 0;
  }

  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}
// 背景图片尺寸想要和背景图片合在一起写，必须有background-position
.banner {
  width: 100%;
  height: 425px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
  // background-size: cover;
}
.logout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  // 子代选择器 只有login的亲儿子才会flex=1
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .editBtn {
    color: #666;
    width: 1.6rem;
    height: 0.4267rem;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      // inherit继承父元素的bgc
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
