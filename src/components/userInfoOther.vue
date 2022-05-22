<template>
  <div class="user-block-wrap">
    <div class="user-block">
      <div class="user-cover">
        <img :src="user.cover | emptyCover" alt="" />
      </div>
      <div class="avatar-block">
        <div class="user-avatar">
          <img :src="user.avatar | emptyAvatar" alt="" />
        </div>
        <div class="tools">
          <div class="icon"><img src="../assets/images/mail.png" alt="" /></div>
          <div class="icon"><img src="../assets/images/noti.png" alt="" /></div>

          <div
            class="btn active"
            v-if="ifFollowing"
            @click.prevent.stop="unFollow(user.id)"
          >
            正在跟隨
          </div>
          <div
            class="btn"
            v-if="!ifFollowing"
            @click.prevent.stop="addFollow(user.id)"
          >
            跟隨
          </div>
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
import userApi from "./../apis/user";
import followshipApi from "./../apis/followship";
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";
import { mapState } from "vuex";
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
      following: [],
      ifFollowing: false,
    };
  },
  methods: {
    fetchUser() {
      this.user = { ...this.initialUser };
    },
    async featchTop() {
      try {
        // 取得tweets資料
        const Topdata = await userApi.getTop();
        const { data } = Topdata;
        this.tops = data;
        this.testId = this.currentUser.id;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得Tops資料，請稍後再試",
        });
      }
    },
    async getFollowing(currentUserId) {
      try {
        // console.log("currentUserId", currentUserId);
        const followingList = await userApi.getFollowing(currentUserId);
        this.following = followingList.data;

        // 追蹤清單中是否有和此人id相同者
        this.ifFollowing = this.following.some(
          (follow) => follow.followingUser.id === this.initialUser.id
        );
        // console.log("this.user.id", this.initialUser.id);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法確認是否有follow此人，請稍後再試",
        });
      }
    },

    async addFollow(id) {
      try {
        await followshipApi.addFollow({ id });
        this.ifFollowing = true;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法follow此人，請稍後再試",
        });
      }
    },
    async unFollow(followingId) {
      try {
        await followshipApi.unFollow({ followingId });
        this.ifFollowing = false;

        // this.$emit("un-follow-one", {
        //   followingId,
        // });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法unFollow此人，請稍後再試",
        });
      }
    },
  },
  created() {
    this.fetchUser();
    this.getFollowing(this.currentUser.id);
  },
  computed: {
    ...mapState(["currentUser"]),
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