<template>
  <div class="wrap admin-users-wrap">
    <navigationAdmin />
    <div class="admin-users">
      <div class="admin-users-title">
        <h4>使用者列表</h4>
      </div>
      <div class="admin-users-cards-wrap">
        <router-link to="/" class="admin-user-card" v-for="user in users" :key="user.id">
          <div class="admin-user-picture-wrap">
            <div class="admin-user-image">
              <img :src="user.cover" alt="" />
            </div>
            <div class="admin-user-avatar">
              <img :src="user.avatar" alt="" />
            </div>
          </div>
          <div class="admin-user-info">
            <div class="admin-user-name">
              <p><b>{{user.name}}</b></p>
            </div>
            <div class="admin-user-account">
              <p class="fz14">@{{user.account}}</p>
            </div>

            <div class="admin-user-count">
              <div class="admin-user-tweet">
                <div class="admin-user-tweet-img">
                  <img src="../assets/images/admin-user-tweet.png" alt="" />
                </div>
                <p>{{user.Tweets}}</p>
              </div>
              <div class="admin-user-like">
                <div class="admin-user-like-img">
                  <img src="../assets/images/admin-user-like.png" alt="" />
                </div>
                <p>{{user.Likes}}</p>
              </div>
            </div>

            <div class="admin-user-follow-count">
              <div class="admin-user-following">
                <p class="fz14 num">{{user.Followings}}個</p>
                <p class="fz14 word">跟隨中</p>
              </div>
              <div class="admin-user-follower">
                <p class="fz14 num">{{user.Followers}}個</p>
                <p class="fz14 word">跟隨者</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import navigationAdmin from "../components/navAdmin";
import adminAPI from "./../apis/admin";


export default {
  name: "adminUsers",
  components: {
    navigationAdmin,
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    async fetchUsers(){
      // 串接api得到回應
      try {
        const response = await adminAPI.getUsersAdmin()
        console.log('response', response)
        this.users = response.data.data.data
      } catch (error) {
        console.log('error',error)
      }
    }
  },
  created(){
    this.fetchUsers()
  }
};
</script>

<style lang="css" src="@/assets/css/adminUsers.css" scoped></style>