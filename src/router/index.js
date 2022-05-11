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
    path: '/SelfPage',
    name: 'SelfPage',
    component: () => import('../views/SelfPage.vue')
  },
  {
    path: '/SelfPage/reply',
    name: 'SelfPage/reply',
    component: () => import('../views/SelfPageReply.vue')
  },
  {
    path: '/SelfPage/likes',
    name: '/SelfPage/likes',
    component: () => import('../views/SelfPageLikes.vue')
  },
  {
    path: '/SelfPage/Follower',
    name: '/SelfPage/Follower',
    component: () => import('../views/SelfPageFollower.vue')
  },
  {
    path: '/SelfPage/Following',
    name: '/SelfPage/Following',
    component: () => import('../views/SelfPageFollowing.vue')
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
