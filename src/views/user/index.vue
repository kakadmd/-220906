<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 信息修改 -->

    <!-- 更新头像 -->
    <!-- document.querySelector('XX).click() -->
    <!-- accept用于规定用户选择文件的类型 不单单是图片 pdf ，exe也可以  -->
    <!-- multiple 如果加上了这个属性，选图片的时候按住ctrl 就可以选多张图片-->
    <input
      type="file"
      ref="file"
      hidden
      accept=".png,.jpg"
      @change="selectPic"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <template #default>
        <van-image round width="0.8rem" height="0.8rem" :src="avator" />
      </template>
    </van-cell>

    <!-- 更新头像的弹出层 -->
    <van-popup
      v-model="isShowPic"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 让UpdateAvator随着弹出层的创建而显示 随着弹出层的销毁而隐藏 -->
      <UpdateAvator
        v-if="isShowPic"
        :avator.sync="avator"
        :changePhoto="photo"
      ></UpdateAvator>
    </van-popup>

    <!-- 更改昵称 -->
    <van-cell title="昵称" is-link @click="ChangeName">{{
      userInfo.name
    }}</van-cell>

    <!-- 更改昵称的弹出层 -->
    <van-popup
      close-icon-position="top-left"
      v-model="isShowChangeName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateName
        @popup-showOne="closeName"
        :uname="userInfo.name"
      ></UpdateName>
    </van-popup>

    <!-- 更改性别 -->
    <van-cell title="性别" is-link @click="ChangeSex">{{
      userInfo.gender === 0 ? '男' : '女'
    }}</van-cell>
    <van-popup
      v-model="isShowChangeSex"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <UpadateSex
        :gender="userInfo.gender"
        @popup-showTwo="closeSex"
        @sex="ChangeSex"
      ></UpadateSex>
    </van-popup>

    <!-- 更改生日 -->
    <van-cell title="生日" is-link @click="ChangeBirthday">{{
      userInfo.birthday
    }}</van-cell>
    <van-popup
      v-model="isShowChangeBirthday"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <UpdateBirthday
        @popup-showThree="closeBir"
        :bir="userInfo.birthday"
      ></UpdateBirthday>
    </van-popup>
  </div>
</template>

<script>
// 1.点击修改图像
//  —— 手动去触发input: file的点击事件

//  input:file
//  - hidden: 等于display：none
//  - accept: 规定file选择文件的类型

// 2.获取用户选择的图片
//  - 给input: file绑定change事件 一改变就会发现（但是只有选择不一样的照片发生改变才会触发change事件）
//  — 用户选择的图片被保存在了input: file.value属性上面,保存了文件的绝对路径，files数组里，保存的file对象
// file对象，文件的二进制对象

// 3.如何将base对象转成base64
//  - FileReader：文件阅读器
//  - const fr = new FileReader(); fr.readAsDataURL
//  - 接受读取的结果：fr.onload = (e) =>{e.target.result/* base64*/}

import UpdateAvator from './components/UpdateAvator.vue'
import UpadateSex from './components/UpadateSex.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'
import UpdateName from './components/UpdateName.vue'

import { resolveToBase64 } from '@/utils'

import { getUserInfoProfileAPI } from '@/api'

export default {
  name: 'editUserInfo',
  components: {
    UpdateAvator,
    UpadateSex,
    UpdateBirthday,
    UpdateName
  },
  data() {
    return {
      isShowPic: false,
      photo: 'userInfo.photo',
      avator: '',
      isShowChangeName: false,
      isShowChangeSex: false,
      isShowChangeBirthday: false,
      userInfo: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      // console.log(getUserInfoAPI())
      const { data } = await getUserInfoProfileAPI()
      console.log(data)
      this.userInfo = data.data
      this.avator = this.userInfo.photo
      if (data.status === 400) {
        this.$toast('参数错误')
      }
      if (data.status === 401) {
        this.$toast('TOKEN过期，请重新登录')
      }
      if (data.status === 507) {
        this.$toast('请刷新')
      }
    },
    async selectPic() {
      // 获取用户选择的图片的file对象
      const pic = this.$refs.file.files[0]
      // console.log(pic)
      // 把file对象转换成img.src可识别的属性，file对象转成base64

      const base64 = await resolveToBase64(pic)
      // 传递base64给子组件
      this.photo = base64

      // 打开弹窗
      this.isShowPic = true

      // 解决不能连续选中同一张图片的bug
      this.$refs.file.value = ''
    },
    ChangeName() {
      // console.log(111)
      this.isShowChangeName = true
    },
    closeName(a) {
      this.isShowChangeName = false
      this.userInfo.name = a
    },
    ChangeSex() {
      this.isShowChangeSex = true
    },
    closeSex(b) {
      this.isShowChangeSex = false
      console.log(this.userInfo)
      this.userInfo.gender = b
    },
    ChangeBirthday() {
      this.isShowChangeBirthday = true
    },
    closeBir(c) {
      this.isShowChangeBirthday = false
      // console.log(c)
      this.userInfo.birthday = c
      // console.log(this.userInfo.birthday)
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
