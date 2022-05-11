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
    path: '/PersonalPage',
    name: 'PersonalPage',
    component: () => import('../views/PersonalPage.vue')
  },
  {
    path: '/PersonalPage/reply',
    name: 'PersonalPage/reply',
    component: () => import('../views/PersonalPage_reply.vue')
  },
  {
    path: '/PersonalPage/likes',
    name: '/PersonalPage/likes',
    component: () => import('../views/PersonalPage_likes.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
