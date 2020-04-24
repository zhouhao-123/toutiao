import Vue from 'vue'
import VueRouter from 'vue-router'
// @表示 src 目录(原始格式)
// import Login from '../views/login/loginIndex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // 懒加载形式访问路由
    component: () => import('../views/login/loginIndex') 
  }
]

const router = new VueRouter({
  routes
})

export default router
