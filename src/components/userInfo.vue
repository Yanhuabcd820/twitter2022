<template>
  <div>
    <popupUserEdit
      v-if="isClickPopupTweet"
      @close-PopupTweet="closePopupTweet"
      :initial-user="user"
      @after-edit-info="AfterEditInfo"
    />
    <div class="user-block">
      <div class="user-cover">
        <img :src="user.cover | emptyCover" alt="" />
      </div>
      <div class="avatar-block">
        <div class="user-avatar">
          <img :src="user.avatar | emptyAvatar" alt="" />
        </div>
        <div class="user-edit" @click.prevent.stop="openPopupTweet">
          編輯個人資料
        </div>
      </div>
      <div class="user-info">
        <div class="user-account">
          <h5>{{ initialUser.name }}</h5>
          <p class="fz14">@{{ initialUser.account }}</p>
        </div>
        <p class="user-des fz14">
          {{ initialUser.introduction }}
        </p>
        <div class="user-follow">
          <router-link
            :to="{
              name: '/SelfPage/Following',
              params: { id: initialUser.id },
            }"
            ><p class="fz14 udline">
              {{ initialUser.followingCount }}個跟隨中
            </p></router-link
          >
          <router-link
            :to="{ name: '/SelfPage/Follower', params: { id: initialUser.id } }"
            ><p class="fz14 udline">
              {{ initialUser.followerCount }}位跟隨者
            </p></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import popupUserEdit from "../components/popupUserEdit";
import { emptyImageFilter } from "./../utils/mixins";
import { mapState } from "vuex";

export default {
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  components: {
    popupUserEdit,
  },
  data() {
    return {
      isClickPopupTweet: false,
      user: {
        id: -1,
        account: "",
        avatar: "",
        cover: "",
        name: "",
        introduction: "",
        //id: this.initialUser.id,
        //account: this.initialUser.account,
        //avatar: this.initialUser.avatar,
        //cover: this.initialUser.cover,
        //name: this.initialUser.name,
        //introduction: this.initialUser.introduction
      },
    };
  },
  methods: {
    openPopupTweet() {
      //console.log(this.isClickPopupTweet);
      this.isClickPopupTweet = true;
    },
    closePopupTweet(payload) {
      const { isClickPopupTweet } = payload;
      this.isClickPopupTweet = isClickPopupTweet;
    },
    AfterEditInfo(payload) {
      const { avatar, cover, name, introduction } = payload;
      console.log(payload);
      this.user.avatar = avatar;
      this.user.cover = cover;
      this.user.name = name;
      this.user.introduction = introduction;
    },
    fetchUser() {
      //console.log(1);
      this.user = { ...this.user, ...this.initialUser };
      //console.log("initial-user in userInfo", this.initialUser.account);
      //console.log("user", this.user.account);
      //console.log(2);
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchUser();
  },
  watch: {
    initialUser() {
      this.user = this.initialUser;
    },
  },
  mixins: [emptyImageFilter],
};
</script>

<style scoped>
.user-block {
  margin-top: 75px;
}
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
.user-cover > img {
  object-fit: cover;
  object-position: initial;
  height: 200px;
  width: 639px;
}
.avatar-block {
  position: relative;
  display: flex;
  justify-content: flex-end;
}
.user-avatar {
  width: 140px;
  height: 140px;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: -70px;
  left: 16px;
  border: 3px white solid;
  background-color: #fff;
}
.user-avatar > img {
  object-fit: cover;
  object-position: initial;
  height: 100%;
  width: 100%;
  background-color: #fff;
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
.user-info {
  margin-left: 16px;
  margin-top: 16px;
}
.user-account {
  padding-top: 8px;
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
.udline:hover {
  text-decoration: underline;
}
</style>