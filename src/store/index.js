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
      isAdmin: false
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
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const token = localStorage.getItem('token')
        // 假如沒有token，就中斷
        if(!token){
          return
        }
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來
        //const response = await userAPI.getUser(1)  // 現在暫時都把user1當成登入的使用者資料
        const response = await authorizationAPI.getCurrentUser()
        
        console.log('store vuex',response)
        const { id, name, account, email, avatar, cover, introduction, role } = response.data
        commit('setCurrentUser', {
          id, name, account, email, avatar, cover, introduction, role
        })
      } catch (error) {
        console.error(error.message)
      }
    }
  },
  modules: {
  }
})
