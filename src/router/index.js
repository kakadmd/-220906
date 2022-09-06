import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '@/views/login' 写了懒加载就不用这个了
Vue.use(VueRouter)
// 单应用 SPA
// 首屏加载速度很慢
// 路由懒加载
//  - 使用到了这个路由页面，再去请求他
const routes = [
  {
    path: '/login',
    // component: () => {
    //   return import('@/views/login')
    // }
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
