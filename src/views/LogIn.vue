<template>
  <div class="container">
    <form @submit.prevent.stop="handleSubmit">
      <div class="logo">
        <img src="./../assets/icons/logo@2x.png" alt="" />
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
        />
        <div class="input-bottomline" :class="{inputBottomLineWarn: !isAccountExist}"></div>
        <div class="input-warning" v-if="!isAccountExist">帳號不存在或是密碼錯誤</div>
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
import authorizationAPI from "./../apis/authorization";
import { Toast } from './../utils/helpers'

export default {
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
      isAccountExist: true
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.account === "root@example.com" || this.account === "root") {
          console.log("you are admin");
          Toast.fire({
            icon: 'warning',
            title: '管理者帳號',
          })
          return;
        }
        const response = await authorizationAPI
        .signIn({
          account: this.account,
          password: this.password,
        })
        //console.log('response in login', response)
        // 取得 API 請求後的資料
        const { data } = response;
        // 將 token 存放在 localStorage 內
        //console.log('data in login',data)
        localStorage.setItem("token", data.data.token);
        //vuex: setting current user
        this.$store.commit("setCurrentUser", data.data.user);
        // 成功登入後轉址到餐廳首頁
        this.$router.push("/tweets");
        Toast.fire({
          icon: 'success',
          title: '成功登入'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '登入失敗'
        })
        this.isAccountExist = false          
      } 
    },
  },
};
</script>