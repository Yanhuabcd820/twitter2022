<template>
  <div class="followTop">
    <div class="followTop-title">
      <h4>跟隨誰</h4>
    </div>
    <div class="followTop-wrap" v-for="top in tops" :key="top.is">
      <div class="followTop-card">
        <router-link
          :to="{ name: 'SelfPage', params: { id: top.id } }"
          class="followTop-avatar"
        >
          <img :src="top.avatar | emptyAvatar" alt="" />
        </router-link>
        <router-link
          :to="{ name: 'SelfPage', params: { id: top.id } }"
          class="followTop-name-wrap"
        >
          <p class="followTop-name">
            <b>{{ top.name }}</b>
          </p>
          <p class="fz14 followTop-account">@{{ top.account }}</p>
        </router-link>

        <div class="followTop-btn-wrap" v-if="top.id == testId">
          <div class="btn active followTop-btn special-you">你很受歡迎</div>
        </div>
        <div class="followTop-btn-wrap" v-else-if="top.isFollowed">
          <div
            class="btn active followTop-btn"
            @click.prevent.stop="unFollow(top.id)"
          >
            正在跟隨
          </div>
        </div>
        <div class="followTop-btn-wrap" v-else>
          <div
            class="btn followTop-btn"
            @click.prevent.stop="addFollow(top.id)"
          >
            跟隨
          </div>
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
    // userId: {
    //   type: Number,
    // },
    initialUser: {
      type: Object,
      required: true,
    },
    otherUser: {
      type: Object,
      required: true,
    },
    ifFollowOtherUser: {
      type: Boolean,
    },
    followOtherId: {
      type: Number,
    },
  },
  data() {
    return {
      tops: {},
      testId: -1,
    };
  },
  watch: {
    ifFollowOtherUser() {
      this.changeBtn();
    },
  },
  methods: {
    changeBtn() {
      this.tops = this.tops.map((top) => {
        if (top.id === this.followOtherId) {
          return {
            ...top,
            isFollowed: this.ifFollowOtherUser,
          };
        }
        return top;
      });
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
    async addFollow(id) {
      try {
        await followshipApi.addFollow({ id });
        this.tops = this.tops.map((top) => {
          if (top.id === id) {
            return {
              ...top,
              isFollowed: true,
            };
          }
          return top;
        });
        this.$emit("add-following-num", {
          followingCount: this.initialUser.followingCount + 1,
          followingId: id,
        });
        // 假如追蹤的按鈕就是otherUser, 就要傳送資訊
        // 以變換父層的按鈕
        if (this.otherUser.id === id) {
          this.$emit("if-change-btn-color", {
            changeBtnColor: true,
          });
        }
        

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
        this.tops = this.tops.map((top) => {
          if (top.id === followingId) {
            return {
              ...top,
              isFollowed: false,
            };
          }
          return top;
        });
        this.$emit("un-following-num", {
          followingCount: this.initialUser.followingCount - 1,
          followingId: followingId,
        });
        if (this.otherUser.id === followingId) {
          this.$emit("if-change-btn-color", {
            changeBtnColor: false,
          });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法unFollow此人，請稍後再試",
        });
      }
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.featchTop();
    //console.log('followtop currentuser id',this.currentUser.id)
  },
  mixins: [emptyImageFilter],
};
</script>


<style lang="css" src="@/assets/css/followTop.css" scoped></style>

<style scoped>
.special-you {
  background-color: orange;
  color: black;
  border-color: orange;
}
</style>