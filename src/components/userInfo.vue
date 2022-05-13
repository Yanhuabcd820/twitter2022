<template>
  <div>
    <popupUserEdit v-if="isClickPopupTweet" @close-PopupTweet="closePopupTweet" :initial-user="user"/>
    <div class="user-block">
      <div class="user-cover">
        <img src="../assets/images/cover.png" alt="">
      </div>
      <div class="avatar-block">
        <div class="user-avatar">
          <img src="../assets/images/AvatarBigger.png" alt="">
        </div>
        <div class="user-edit" @click.prevent.stop="openPopupTweet">
          編輯個人資料
        </div>
      </div>
      <div class="user-info">
        <div class="user-account">
          <h5>{{user.name}}</h5>
          <p class="fz14">@{{user.account}}</p>
        </div>
        <p class="user-des fz14">
          {{user.introduction}} 
        </p>
        <div class="user-follow">
          <p class="fz14">{{user.followingCount}}個跟隨中</p>
          <p class="fz14">{{user.followerCount}}位跟隨者</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import popupUserEdit from "../components/popupUserEdit";

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    popupUserEdit
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
  }
}
</script>

<style scoped>
  .user-name {
    display: flex;
    flex-direction: column;
  }
  .user-name h5 {
    line-height: 26px;
  }
  .user-name p {
    line-height: 18.82px;
    color: var(--secondary-text-color);
  }
  .avatar-block {
    position: relative;
    display: flex;
    justify-content: end;
  }
  .user-avatar {
    width: 140px;
    position: absolute;
    top: -70px;
    left: 16px;
  }
  .user-edit {
    width: 128px;
    height: 40px;
    border: var(--main-color) 1px solid;
    color: var(--main-color);
    border-radius: 50px;
    margin-top: 16px;
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-info{
    margin-left: 16px;
    margin-top: 16px;
  }
  .user-account p {
    color: var(--secondary-text-color);
  }
  .user-follow {
    display: flex;
  }
  .user-follow p {
    margin-right: 20px;
  }
</style>