import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from './../apis/authorization'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      account: '',
      email: '',
      avatar: '',
      cover: '',
      introduction: '',
      role: '',
      isAdmin: false,
      tweetCount: 0
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      //console.log('store vuex2  ',currentUser)
      //console.log('store vuex2 state ',state.currentUser)
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const token = localStorage.getItem('token')
        // 假如沒有token，就中斷

        if(!token){
          // 把vuex 清空
          return
        }
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來
        const response = await authorizationAPI.getCurrentUser()
        console.log('store vuex',response)
        //console.log('store vuex response data',response.data)
        const { id, name, account, email, avatar, cover, introduction, role } = response.data.currentUser
        const tweetCount = response.data.tweetCount
        //console.log('test',{
        //  id, name, account, email, avatar, cover, introduction, role, tweetCount
        //})
        commit('setCurrentUser', {
          id, name, account, email, avatar, cover, introduction, role, tweetCount
        })
      } catch (error) {
        console.error(error.message)
      }
    }
  },
  modules: {
  }
})
