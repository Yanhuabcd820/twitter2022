<template>
  <div class="container">
    <form @click.stop.prevent="handleSubmit">
      <div class="logo">
        <img src="./../assets/icons/logo@2x.png" alt="">
      </div>
      <div class="title">
        <h3>建立你的稱號</h3>
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
        <label for="name">名稱</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="請輸入使用者名稱"
          required
          autofocus
          v-model="name"
        >
      </div>
      <div class="form-label-group">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="請輸入Email"
          required
          autofocus
          v-model="email"
        >
      </div>
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="請設定密碼"
          required
          autofocus
          v-model="password"
        >
      </div>
      <div class="form-label-group">
        <label for="passwordCheck">密碼確認</label>
        <input
          id="passwordCheck"
          name="passwordCheck"
          type="password"
          placeholder="請再次輸入密碼"
          required
          autofocus
          v-model="passwordCheck"
        >
      </div>
      <button class="confirm-btn" type="submit">
        <p>註冊</p>
      </button>
      <nav>
        <router-link to="/login">取消</router-link>
      </nav>
    </form>
  </div>
</template>

<style lang="css" src="./../assets/css/LoginRegist.css" scoped></style>
<style scoped>
  nav {
    justify-content: center;
  }
</style>

<script>
export default {
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      passwordCheck: ''
    }
  },
  methods: {
    handleSubmit () {
      const data = JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
        passwordCheck: this.passwordCheck
      })
      console.log('data', data)
    }
  }
}
</script>
