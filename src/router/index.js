import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import LogIn from '../views/LogIn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'log-in',
    component: LogIn,
  },
  {
    path: '/regist',
    name: 'regist',
    component: () => import('../views/Regist.vue')
  },
  {
    path: '/mainPage',
    name: 'mainPage',
    component: () => import('../views/mainPage.vue')
  },
  {
    path: '/reply',
    name: 'replyPage',
    component: () => import('../views/reply.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/setting.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue')
  },
  {
    path: '/admin/adminTweetList',
    name: 'adminTweetList',
    component: () => import('../views/adminTweetList.vue')
  },
  {
    path: '/admin/adminUsers',
    name: 'users',
    component: () => import('../views/adminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]


const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})
export default router
