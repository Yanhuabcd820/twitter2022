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
            <b>{{ top.name | partOfContents}}</b>
          </p>
          <p class="fz14 followTop-account">@{{ top.account | partOfContents }}</p>
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
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tops: {},
      testId: -1,
    };
  },
  methods: {
    async featchTop() {
      try {
        // 取得Tops資料
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
          followingCount: this.currentUser.followingCount + 1,
        });
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
          followingCount: this.currentUser.followingCount - 1,
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法unFollow此人，請稍後再試",
        });
      }
    },
  },
  filters: {
    partOfContents(text){
      return text.length > 9 ? text.substr(0, 9)+'...' : text 
    }
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