import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import LogIn from '../views/LogIn.vue'
import store from '../store'
import { Toast } from "./../utils/helpers";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/logIn'
  },
  {
    path: '/login',
    name: 'log-in',
    component: LogIn,
  },
  {
    path: '/regist',
    name: 'regist',
    component: () => import('../views/Regist.vue')
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: () => import('../views/tweets.vue')
  },

  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('../views/tweet.vue')
  },
  {
    path: '/user/:id',
    name: 'SelfPage',
    component: () => import('../views/SelfPage.vue')
  },
  {
    path: '/user/:id/reply',
    name: 'SelfPage/reply',
    component: () => import('../views/SelfPageReply.vue')
  },
  {
    path: '/user/:id/like',
    name: '/SelfPage/like',
    component: () => import('../views/SelfPageLikes.vue')
  },
  {
    path: '/user/:id/follower',
    name: '/SelfPage/Follower',
    component: () => import('../views/SelfPageFollower.vue')
  },
  {
    path: '/user/:id/following',
    name: '/SelfPage/Following',
    component: () => import('../views/SelfPageFollowing.vue')
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
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]


const router = new VueRouter({
  // linkExactActiveClass: 'active',
  routes
})

if (!navigator.onLine) {
  Toast.fire({
    icon: "warning",
    title: "網路連線中斷",
  });
}

router.beforeEach(async (to, from, next) => {
  // 使用 dispatch 呼叫 Vuex 內的 actions
  await store.dispatch('fetchCurrentUser')
  next()
})

export default router
