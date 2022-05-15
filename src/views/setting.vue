<template>
  <div class="wrap setting-wrap">
    <navigation />
    <div class="setting">
      <div class="setting-title">
        <h4>帳戶設定</h4>
      </div>

      <div class="container">
        <form action="">
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
            <label for="name">名稱</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="請輸入使用者名稱"
              required
              autofocus
              v-model="name"
            />
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
            />
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
            />
          </div>
          <div class="form-label-group">
            <label for="passwordCheck">密碼再確認</label>
            <input
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              placeholder="請再次輸入密碼"
              required
              autofocus
              v-model="passwordCheck"
            />
          </div>
          <div class="btn setting-save active">
            <p>儲存</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import navigation from "../components/nav";
export default {
  name: "setting",
  components: {
    navigation,
  },
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },
  methods: {},
};
</script>

<style lang="css" src="@/assets/css/setting.css" scoped></style>