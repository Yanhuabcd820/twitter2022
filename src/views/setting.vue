<template>
  <div class="wrap setting-wrap">
    <navigation :userId="currentUser.id"/>
    <div class="setting">
      <div class="setting-title">
        <h4>帳戶設定</h4>
      </div>
      <div class="container">
        <form action="" @submit.stop.prevent="handleSubmit">
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
              v-model="email"
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
              autofocus
              v-model="password"
            />
            <div class="input-bottomline"></div>
          </div>
          <div class="form-label-group">
            <label for="passwordCheck">密碼再確認</label>
            <input
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              placeholder="請再次輸入密碼"
              autofocus
              v-model="passwordCheck"
            />
            <div class="input-bottomline"></div>
          </div>
          <button class="btn setting-save active" type="submit">
            <p>儲存</p>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import navigation from "../components/nav";
import authorizationAPI from "./../apis/authorization";

import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'

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
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    fetchData (){
      this.account = this.currentUser.account
      this.name = this.currentUser.name
      this.email = this.currentUser.email
    },
    async handleSubmit(){
      try {
        // 確認密碼跟確認密碼的部分，必須一樣而且要有內容才會執行
        if (this.password !== this.passwordCheck){
          Toast.fire({
            icon: 'warning',
            title: '密碼沒輸入，或者密碼跟再確認密碼不同'
          })
          return
        }

        if (this.name.length > 50) {
          Toast.fire({
            icon: 'warning',
            title: '名字不能超過50字'
          })
          return
        }

      // 串API
        const response = await authorizationAPI
        .updateUser(this.currentUser.id,{
          name: this.name,
          account: this.account,
          email: this.account,
          password: this.password,
          introduction: this.currentUser.introduction,
          avatar: this.currentUser.avatar,
          cover: this.currentUser.cover
        })
        console.log(response)
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '發生錯誤'
        })
      }
    }
  },
  created(){
    // 用token取得資料，取得後看role，是user或是admin，如果不是use，就跳出提醒，回到登入頁
    const twitterToken = localStorage.getItem("token");
    //console.log(twitterToken)
    if (!twitterToken) {
      Toast.fire({
        icon: "warning",
        title: "請登入",
      });
      this.$router.push("/login");
    }
    this.fetchData()
  }
};
</script>

<style lang="css" src="@/assets/css/setting.css" scoped></style>