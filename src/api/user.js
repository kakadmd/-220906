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
