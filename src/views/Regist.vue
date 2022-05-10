<template>
  <div class="container">
    <form action="">
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
          placeholder="請輸入密碼"
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
          placeholder="請輸入密碼"
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
          placeholder="請輸入密碼"
          required
          autofocus
          v-model="password"
        >
      </div>
      <div class="form-label-group">
        <label for="password_confirm">密碼確認</label>
        <input
          id="password_confirm"
          name="password_confirm"
          type="password"
          placeholder="請輸入密碼"
          required
          autofocus
          v-model="password_confirm"
        >
      </div>
      <div class="confirm-btn">
        <p>註冊</p>
      </div>
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