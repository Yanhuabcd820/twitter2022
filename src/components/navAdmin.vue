<template>
  <div class="nav-admin">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="" />
    </div>
    <div class="nav-admin-btn-group">
      <router-link to="/admin/adminTweetList" class="nav-admin-btn">
        <div class="nav-admin-btn-img nav-admin-btn-home-img"></div>
        <h5>推文清單</h5>
      </router-link>
      <router-link to="/admin/adminUsers" class="nav-admin-btn">
        <div class="nav-admin-btn-img nav-admin-btn-user-img"></div>
        <h5>使用者列表</h5>
      </router-link>
    </div>

    <div class="nav-admin-btn-group-bottom">
      <div class="nav-admin-btn-group btn-bottom" @click="logOut">
        <router-link to="/admin" class="nav-admin-btn">
          <div class="nav-admin-btn-img nav-admin-btn-left-img"></div>
          <h5>登出</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="css" src="@/assets/css/navAdmin.css" scoped></style>

<script>
export default {
  methods: {
    logOut() {
      localStorage.removeItem("token");
    },
  }

}
</script>