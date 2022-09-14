import Vue from 'vue'
import Vuex from 'vuex'
import createPersistatedState from 'vuex-persistedstate'
Vue.use(Vuex)

// vuex-persistedstate ——> 持久化state

// 1.下载
//  - yarn add vuex-persistedstate@3.2.1
// 2.引入
//  - import createPersistatedState from 'vuex-persistedstate'
// 3.调用
//  -plugins : [createPersistatedState()]

// 配置项
// key：默认值是vuex 想修改传入key
// storage：存储的方式 默认值是本地存储
// reducer：指定持久化哪些数据，函数。return出来一个对象，对象就作为存储的value
export default new Vuex.Store({
  plugins: [
    createPersistatedState({
      key: 'HMTT-M',
      storage: window.sessionStorage,
      reducer(state) {
        // console.log(state)
        const { tokenObj, myChannels } = state
        return { tokenObj, myChannels }
      }
    })
  ],
  state: {
    // tokenObj: JSON.parse(window.localStorage.getItem('HEIMATOUTIAO_M')) || {}
    tokenObj: {},
    myChannels: []
  },
  getters: {
    // 用于标识用户是否登录
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 将token存在vuex里面
      state.tokenObj = token
      /* // 将token持久化放入本地存储
      window.localStorage.setItem('HEIMATOUTIAO_M', JSON.stringify(token)) */
    },
    /**
     *
     * @param {Array} channels 删除或添加后的最新的channels
     */
    SET_MY_CHANNEL(state, channels) {
      state.myChannels = channels
    }
  }
})
