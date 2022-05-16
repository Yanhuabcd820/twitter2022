<template>
  <div class="container">
    <form @submit.stop.prevent="handleSubmit">
      <div class="logo">
        <img src="./../assets/icons/logo@2x.png" alt="" />
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
          v-model="user.account"
        />
        <div class="input-bottomline"></div>
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
          v-model="user.name"
        />
        <div class="input-bottomline"></div>
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
          v-model="user.email"
        />
        <div class="input-bottomline"></div>
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
          v-model="user.password"
        />
        <div class="input-bottomline"></div>
      </div>
      <div class="form-label-group">
        <label for="passwordCheck">密碼確認</label>
        <input
          id="checkPassword"
          name="checkPassword"
          type="password"
          placeholder="請再次輸入密碼"
          required
          autofocus
          v-model="user.confirmPassword"
        />
        <div class="input-bottomline"></div>
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
import authorizationAPI from "./../apis/authorization";
import { Toast } from './../utils/helpers'

export default {
  data() {
    return {
      user: {
        account: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        console.log(this.user)
        if (this.user.account === "root") {
          console.log("you are admin");
          Toast.fire({
            icon: 'warning',
            title: '管理者帳號'
          })
          return;
        }
      // const jsonfile = JSON.stringify({
      //   account: this.user.account,
      //   password: this.user.password,
      //   confirmPassword: this.user.confirmPassword,
      //   name: this.user.name,
      //   email: this.user.email
      // })
        const response = await authorizationAPI
        .signUp(this.user)
        console.log('signup',response)
        Toast.fire({
          icon: 'success',
          title: '成功註冊'
        })
        this.$router.push("/login"); // 註冊後跳到登入頁面
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'warning',
          title: '註冊失敗'
        })
      }
    },
  },
};
</script>
