<template>
  <div>
    <div class="user-block">
      <div class="user-cover">
        <img :src="user.cover | emptyImage" alt="" />
      </div>
      <div class="avatar-block">
        <div class="user-avatar">
          <img :src="user.avatar | emptyImage" alt="" />
        </div>
        <div class="tools">
          <div class="icon"><img src="../assets/images/mail.png" alt="" /></div>
          <div class="icon"><img src="../assets/images/noti.png" alt="" /></div>
          <div class="btn active">正在跟隨</div>
        </div>
      </div>
      <div class="user-info">
        <div class="user-account">
          <h5>{{ user.name }}</h5>
          <p class="fz14">@{{ user.account }}</p>
        </div>
        <p class="user-des fz14">
          {{ user.introduction }}
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
import { emptyImageFilter } from "./../utils/mixins";
export default {
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    fetchUser() {
      this.user = { ...this.initialUser };
    },
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
  justify-content: end;
}
.user-avatar {
  width: 140px;
  position: absolute;
  top: -70px;
  left: 16px;
}
.user-avatar > img {
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
}
.tools {
  display: flex;
  margin-top: 16px;
}
.tools div {
  margin-right: 16px;
}
.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--main-color);
  position: relative;
}
.icon img {
  width: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.udline:hover {
  text-decoration: underline;
}
</style>