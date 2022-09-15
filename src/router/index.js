import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '@/views/login' 写了懒加载就不用这个了
Vue.use(VueRouter)
// 单应用 SPA
// 首屏加载速度很慢
// 路由懒加载
//  - 使用到了这个路由页面，再去请求他

// 懒加载的chunk 默认的名字是模块的路径
// webpack魔法注释
// /* webpackChunkName:"新名字" */
const routes = [
  {
    path: '/',
    // 懒加载用到的时候才会去加载
    component: () => import('@/views/Layout'),
    redirect: '/ ', // 重定向带有空格
    children: [
      {
        path: '/ ',
        component: () => import(/* webpackChunkName:"home" */ '@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:"base" */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName:"base" */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    // component: () => {
    //   return import('@/views/login')
    // }
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:"Search" */ '@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
