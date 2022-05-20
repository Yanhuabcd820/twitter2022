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
          <img :src="top.avatar | emptyImage" alt="" />
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
        <div
          class="followTop-btn-wrap"
          v-if="top.isFollowed"
          @click.prevent.stop="unFollow(top.id)"
        >
          <div class="btn active followTop-btn">正在跟隨</div>
        </div>
        <div
          class="followTop-btn-wrap"
          v-if="!top.isFollowed"
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
import { emptyImageFilter } from "./../utils/mixins";
export default {
  props: {
    userId: {
      type: Number,
    },
  },
  data() {
    return {
      tops: {},
    };
  },
  methods: {
    async featchTop() {
      try {
        // 取得tweets資料
        const Topdata = await userApi.getTop();
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
              isFollowed: true,
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

    async unFollow(followingId) {
      try {
        console.log("id", followingId);
        const dataUnFollow = await followshipApi.unFollow({ followingId });
        console.log("dataUnFollow", dataUnFollow);
        // if (dataUnFollow.data.status !== "Success") {
        //   throw new Error(dataUnFollow.data.statusText);
        // }
        this.tops = this.tops.map((top) => {
          if (top.id === followingId) {
            return {
              ...top,
              isFollowed: false,
            };
          }
          return top;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法unFollow此人，請稍後再試",
        });
      }
    },
  },
  created() {
    this.featchTop();
  },
  mixins: [emptyImageFilter],
};
</script>


<style lang="css" src="@/assets/css/followTop.css" scoped></style>