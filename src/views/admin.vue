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
        <div class="input-bottomline"></div>
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
        <div class="input-bottomline"></div>
      </div>
      <button class="confirm-btn" type="submit">
        <p>登入</p>
      </button>
      <nav>
        <router-link to="/"> <p class="login-btn">前台登入</p> </router-link>
      </nav>
    </form>
  </div>
</template>

<style lang="css" src="./../assets/css/LoginRegist.css" scoped></style>

<script>
import { Toast } from "./../utils/helpers";
import adminAPI from "./../apis/admin";

export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.account !== "root") {
          console.log("you are not admin");

          Toast.fire({
            icon: "warning",
            title: "請輸入管理員的帳密",
          });
          return;
        }
        // 把帳號密碼連API
        const response = await adminAPI.signInAdmin({
          account: this.account,
          password: this.password,
        });
        // 取得 API 請求後的資料
        const { data } = response;
        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.data.token);

        Toast.fire({
          icon: "success",
          title: "成功登入",
        });

        //vuex: setting current user
        //this.$store.commit("setCurrentUser", data.data.user);

        // 成功登入後轉址到餐廳首頁
        this.$router.push("/admin/adminTweetList");
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "登入失敗",
        });
      }
    },
  },
};
</script>