<template>
  <div class="container">
    <form action="" @submit.stop.prevent="handleSubmit">
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
import { Toast } from './../utils/helpers'

export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    handleSubmit () {
      
      if (this.account !== "root") {
        console.log("you are not admin");

        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })

        return;
      }
      Toast.fire({
        icon: 'success',
        title: '成功登入'
      })
      // 把帳號密碼連API

      // 取得 API 請求後的資料
      //const { data } = response;
      // 將 token 存放在 localStorage 內
      //localStorage.setItem("token", data.data.token);
      //vuex: setting current user
      //this.$store.commit("setCurrentUser", data.data.user);

      // 成功登入後轉址到餐廳首頁
      this.$router.push('/admin/adminTweetList')
    },
  }
};
</script>