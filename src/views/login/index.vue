<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <!-- van-field：输入框，text，password，文本域... -->
    <!-- v-model：绑定用户输入的值 -->
    <!-- name：用于标识表单项 -->
    <!-- rules：是一个数组 里面是对象
         rules：{required：是否必选，message：错误提示文案，pattern：正则，trigger：规则的触发时机onBlur，onChange} -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>

      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码 -->
        <template #button>
          <van-button
            block
            type="default"
            size="small"
            round
            native-type="button"
            class="btn"
            v-if="isShowCode"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="5 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { codeRules, mobileRules } from './rule'
// 引入API
import { login, sendCodeAPI } from '@/api'
// token 身份证 标识用户是否登录（需要存起来）
// 存在本地存储的话：没有响应式
// 存在vuex 他是有响应式的功能
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCode: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      // 0.验证用户是否输入有效的手机号
      //   ref 加在普通的元素上，用this.$refs.（ref值） 获取到的是dom元素
      //   - 给form绑定ref
      //   - $refs.form
      // validate：支持传入 name 来验证单个或部分表单项
      await this.$refs.form.validate('mobile')

      this.loading()
      // 1.发送请求
      try {
        await sendCodeAPI(this.mobile)
        // 2.显示倒计时组件
        this.isShowCode = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          // axios的错误
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    ...mapMutations(['SET_TOKEN']),
    async onSubmit() {
      // submit只有在表单校验通过之后才会被触发
      // 登录成功或失败的提示
      // loading
      // message：提示消息
      // forbidClick 禁止背景点击
      // duration：展示时长
      this.loading()
      try {
        // 登录
        const { data } = await login(this.mobile, this.code)
        // console.log(data)
        // console.log(data.data)
        // 将token存进vuex里面
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push('/profile')
        // 成功的提示
        this.$toast.success('登录成功') // 同一时间只能展示一个 写这个会把上面的加载中挤掉
      } catch (error) {
        // 细分一下失败原因：提示用户手机号和验证码
        // 如果是手机号错了，提示用户
        // err:
        // 1.有可能是浏览器js抛的错误
        // 2.axios封装的error对象
        //   — error.response.data 后端返回的数据
        //   — error.response.status 后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // 1.js 导致的错误
          // 这是在后台打印出错误方便看到
          console.dir(error)
          // 手动把toast关掉
          this.$toast.clear()
          // 这个是把错误往上抛 变红(看的更直观)
          throw error
          // 2.507 数据库出问题了(后端的问题)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
// scoped 样式作用于当前的组件
// van-nav-bar__title是别人的组件 这是在自己的组件改变别人的组件
// vue-cli提供了语法：:deep()深度选择器
.nav-bar {
  background-color: #3396fc;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  color: #a58594;
  background-color: #eeeeee;
}
</style>
