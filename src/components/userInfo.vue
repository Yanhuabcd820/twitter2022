<template>
  <div>
    <popupUserEdit v-if="isClickPopupTweet" @close-PopupTweet="closePopupTweet" :initial-user="user" @after-edit-info="AfterEditInfo"/>
    <div class="user-block">
      <div class="user-cover">
        <img :src="user.cover" alt="">
      </div>
      <div class="avatar-block">
        <div class="user-avatar">
          <img :src="user.avatar" alt="">
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
          <router-link to="/SelfPage/Following"><p class="fz14 udline">{{initialUser.followingCount}}個跟隨中</p></router-link>
          <router-link to="/SelfPage/Follower"><p class="fz14 udline">{{initialUser.followerCount}}位跟隨者</p></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import popupUserEdit from "../components/popupUserEdit";

export default {
  props: {
    initialUser: {
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
       user : {
        id: this.initialUser.id,
        account: this.initialUser.account,
        avatar: this.initialUser.avatar,
        cover: this.initialUser.cover,
        name: this.initialUser.name,
        introduction: this.initialUser.introduction
      },
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
    AfterEditInfo(payload){
      const { avatar,cover } = payload
      console.log(payload)
      this.user.avatar = avatar
      this.user.cover = cover
    }
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
  .user-cover>img {
    object-fit: cover;
    object-position: initial;
    height: 200px;
    width: 639px;
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
  .user-avatar>img{
    object-fit: cover;
    object-position: initial;
    height: 140px;
    width: 140px;
    border-radius: 50%;
    border: 3px white solid;
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
  .user-edit:hover {
    border: var(--main-color) 1px solid;
    color: white;
    background-color: var(--main-color);
    cursor: pointer;
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
    color: #171725;
  }
  .udline:hover{
    text-decoration: underline;
  }
</style>