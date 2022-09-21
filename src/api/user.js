// user.js划分是跟后端接口文档
import request from '@/utils/request'
// import store from '@/store'
/**
 * 登录
 * @param {String} mobile
 * @param {Number} code
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码函数封装
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户信息
 * @return Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   // 在vue文件里面 可以通过this.$store.state.tokenObj.token
    //   // 但是现在是js文件 需要把store引入 这个时候用store.state.tokenObj.token
    //   // Bearer和token中间有一个空格
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}

/**
 * 上传图片
 * @param {*} file 裁剪过后的图片
 * @return Promise
 */
export const UploadPicAPI = (file) => {
  const fm = new FormData()
  fm.append('photo', file)

  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

// export const UploadUserMessageAPI = (name, gender, birthday) => {
//   return request({
//     url: '/v1_0/user/profile',
//     method: 'PATCH',
//     data: {
//       name,
//       gender,
//       birthday
//     }
//   })
// }

export const UploadUserMessageAPI = (

  { name, gender, birthday }
) => {
  // 判断有什么值再判断带什么参数
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH', // 局部更新——>全都更新
    data: {
      // data不会忽略值为null的那对key+value，params遇到null值会忽略不携带此对参数和值给后台
      name, // 昵称
      gender, // 性别，0-男，1-女
      birthday // 生日
    }
  })
}

/**
 * 获取用户详细信息
 * @return Promise
 */
export const getUserInfoProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
    // headers: {
    //   // 在vue文件里面 可以通过this.$store.state.tokenObj.token
    //   // 但是现在是js文件 需要把store引入 这个时候用store.state.tokenObj.token
    //   // Bearer和token中间有一个空格
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}
