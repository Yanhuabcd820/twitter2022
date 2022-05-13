<template>
  <div class="container">
    <form @submit.prevent.stop='handleSubmit'>
      <div class="logo">
        <img src="./../assets/icons/logo@2x.png" alt="">
      </div>
      <div class="title">
        <h3>登入 Alphitter</h3>
      </div>
      <div class="form-label-group">
        <label for="account">帳號</label>
        <input
          id="account"
          name="account"
          type="text"
          placeholder="請輸入帳號"
          required
          autofocus
          v-model="account"
        >
      </div>
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="請輸入密碼"
          required
          autofocus
          v-model="password"
        >
      </div>
      <button type="submit" class="confirm-btn" :disabled="isProcessing">
        <p>登入</p>
      </button>
      <nav>
        <router-link to="/regist">註冊</router-link>
        <p>・</p>
        <router-link to="/admin">後台登入</router-link>
      </nav>
    </form>
  </div>
</template>

<style lang="css" src="./../assets/css/LoginRegist.css" scoped></style>

<script>
//import authorizationAPI from './../apis/authorization'
//import { Toast } from './../utils/helpers'

export default {
  data(){
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    handleSubmit () {
      //console.log(e)
      //authorizationAPI.signIn({
      //  account: this.account,
      //  password: this.password
      //}).then(response => {
      //  console.log(response)
      //  console.log('1')
        // 取得 API 請求後的資料
        //const { data } = response
        // 將 token 存放在 localStorage 內
        const data = {
          token: 'justForTest'
        }
        localStorage.setItem('token', data.token)
        // 成功登入後轉址到餐廳首頁
        this.$router.push('/mainPage')
      //})
    },
    
  }
}
</script>