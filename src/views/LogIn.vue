<template>
  <div class="container">
    <form action="">
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
      <div class="confirm-btn">
        <p>登入</p>
      </div>
      <nav>
        <a href="">註冊</a>
        <p>・</p>
        <a href="">後台登入</a>
      </nav>
    </form>
  </div>
</template>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}

.container {
  position: relative;
}
form {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.logo{
  margin-top: 69px;
  display: flex;
  justify-content: center;
}
img {
  width: 50px;
  height: 50px;
}
.title {
  margin-top: 29px;
  margin-bottom: 40px;
  text-align: center;
}
.title h3 {
  font-size: 28px;
}
.form-label-group {
  display: flex;
  flex-direction: column;
  width: 356px;
  background-color: #F5F8FA;
  border-bottom: 2px #657786 solid;
  padding: 2px 10.55px;
  margin-bottom: 32px;
  box-sizing: border-box;
}
label{
  font-size: 14px;
  line-height: 22px;
}
input{
  font-size: 16px;
  line-height: 26px;
  border: 0;
  background-color: #F5F8FA;
  outline: none;
}
.confirm-btn {
  background-color: #FF6600;
  width: 356px;
  height: 46px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 30px;
  color: white;
}
nav {
  margin-top: 22px;
  display: flex;
  justify-content: end;
}
nav > * {
  margin-left: 12px;
}
nav:last-child {
  margin-right: 15px;
}

</style>