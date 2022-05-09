<template>
  <div class="container">
    <form action="">
      <div>
        <img src="./../assets/icons/logo@2x.png" alt="">
        <h1>登入 Alphitter</h1>
      </div>
      <div class="form-label-group mb-2">
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
      <div class="form-label-group mb-2">
        <label for="account">密碼</label>
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
    </form>
  </div>
</template>