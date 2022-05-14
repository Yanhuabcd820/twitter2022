<template>
  <div class="nav">
    <popupTweet v-if="isClickPopupTweet" @close-PopupTweet="closePopupTweet" />
    <div class="logo">
      <img src="../assets/images/logo.png" alt="" />
    </div>
    <div class="nav-btn-group">
      <router-link to="/mainPage" class="nav-btn">
        <div class="nav-btn-img nav-btn-home-img"></div>
        <h5>首頁</h5>
      </router-link>
      <router-link to="/user" class="nav-btn">
        <div class="nav-btn-img nav-btn-user-img"></div>
        <h5>個人資料</h5>
      </router-link>
      <router-link to="/setting" class="nav-btn">
        <div class="nav-btn-img nav-btn-setting-img"></div>
        <h5>設定</h5>
      </router-link>
    </div>
    <div class="btn nav-btn-tweet" @click.prevent.stop="openPopupTweet">
      推文
    </div>
    <div class="nav-btn-group-bottom">
      <div class="nav-btn-group btn-bottom">
        <a href="#" class="nav-btn">
          <div class="nav-btn-img nav-btn-left-img"></div>
          <h5>登出</h5>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import popupTweet from "../components/popupTweet";
export default {
  name: "navigation",
  components: {
    popupTweet,
  },
  data() {
    return {
      isClickPopupTweet: false,
    };
  },
  methods: {
    openPopupTweet() {
      console.log(this.isClickPopupTweet);
      this.isClickPopupTweet = true;
    },
    closePopupTweet(payload) {
      const { isClickPopupTweet } = payload;
      this.isClickPopupTweet = isClickPopupTweet;

      console.log("closePopupTweet", this.isClickPopupTweet);
    },
  },
};
</script>
<style lang="css" src="@/assets/css/nav.css" scoped></style>