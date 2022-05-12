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
        <router-link to="">後台登入</router-link>
      </nav>
    </form>
  </div>
</template>

<style lang="css" src="./../assets/css/LoginRegist.css" scoped></style>

<script>
export default {
  data(){
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    handleSubmit(){
      console.log('account:'+this.account)
      console.log('pw:'+this.password)
      if (this.account === 'root@example.com' && this.password==='12345678'){
        console.log('success')
        this.$router.push('/mainPage')
      }
    }
  }
}
</script>