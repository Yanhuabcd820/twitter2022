<template>
  <div class="followTop">
    <div class="followTop-title">
      <h4>跟隨誰</h4>
    </div>
    <div class="followTop-wrap" v-for="top in tops" :key="top.is">
      <div class="followTop-card">
        <div class="followTop-avatar">
          <img :src="top.avatar" alt="" />
        </div>
        <div class="followTop-name-wrap">
          <p class="followTop-name">
            <b>{{ top.name }}</b>
          </p>
          <p class="fz14 followTop-account">@{{ top.account }}</p>
        </div>
        <div class="followTop-btn-wrap" v-if="top.isFollowing">
          <div class="btn active followTop-btn">正在跟隨</div>
        </div>
        <div
          class="followTop-btn-wrap"
          v-if="!top.isFollowing"
          @click.prevent.stop="addFollow(top.id)"
        >
          <div class="btn followTop-btn">跟隨</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "./../apis/user";
import followshipApi from "./../apis/followship";
import { Toast } from "./../utils/helpers";
export default {
  props: {
    userId: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      tops: {},
    };
  },
  methods: {
    async featchTop(userId) {
      try {
        // 取得tweets資料
        const Topdata = await userApi.getTop(userId);
        const { data } = Topdata;
        this.tops = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得Tops資料，請稍後再試",
        });
      }
    },
    async addFollow(id) {
      try {
        const addFollow = await followshipApi.addFollow({ id });
        console.log(addFollow);
        const { data } = addFollow;
        console.log(data);
        this.tops = this.tops.map((top) => {
          if (top.id === id) {
            return {
              ...top,
              isFollowing: true,
            };
          }
          return top;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法follow此人，請稍後再試",
        });
      }
    },
  },
  created() {
    this.featchTop(this.userId);
  },
};
</script>


<style lang="css" src="@/assets/css/followTop.css" scoped></style>