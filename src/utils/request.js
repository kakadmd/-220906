// 1.yarn add axios
// 2.引入axios
// 3.配置axios
import axios from 'axios'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000
import store from '@/store'
// axios.create() 克隆axios创造全新的axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器:请求做一些事情
// config是每一次请求的配置对象
// 必须返回config
request.interceptors.request.use(
  function (config) {
    // 每一次发请求都会执行
    // 在发送请求之前做做些什么
    // 登陆了，所有的请求都加上Authorization
    // console.log(config)
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (err) {
    console.log(err)
  }
)
export default request
