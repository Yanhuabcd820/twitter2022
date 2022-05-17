<template>
  <ul>
    <li class="nav-item" v-for="tab in tabs" :key="tab.id">
      <router-link :to="tab.path" class="nav-link">
        {{ tab.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tabs: [
        {
          id: 1,
          title: "跟隨者",
          path: `/user/${this.userId}/Follower`,
        },
        {
          id: 2,
          title: "正在跟隨",
          path: `/user/${this.userId}/Following`,
        },
      ],
    };
  },
};
</script>

<style scoped>
ul {
  display: flex;
  width: 624px;
  height: 52px;
  align-items: center;
  border-top: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
  margin-top: 74px;
  position: fixed;
  background-color: #fff;
}
li {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 130px;
  height: 100%;
}
.nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #657786;
  position: relative;
  height: 100%;
  width: 100%;
}
.router-link-exact-active {
  color: var(--main-color);
}
li .router-link-exact-active {
  border-bottom: var(--main-color) 2px solid;
}
</style>