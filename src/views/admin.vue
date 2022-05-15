<template>
  <div class="container">
    <form action="">
      <div class="logo">
        <img src="./../assets/icons/logo@2x.png" alt="" />
      </div>
      <div class="title">
        <h3>後台登入</h3>
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
        />
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
        />
      </div>
      <div class="confirm-btn">
        <p>登入</p>
      </div>
      <nav>
        <router-link to="/"> <p class="login-btn">前台登入</p> </router-link>
      </nav>
    </form>
  </div>
</template>

<style lang="css" src="./../assets/css/LoginRegist.css" scoped></style>

<script>
export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    handleSubmit () {
     
        // 成功登入後轉址到餐廳首頁
        this.$router.push('/adminTweetList')
    },
  }
};
</script>