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
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tabs: [
        {
          id: 1,
          title: "推文",
          path: `/user/${this.userId}`,
        },
        {
          id: 2,
          title: "回覆",
          path: `/user/${this.userId}/reply`,
        },
        {
          id: 3,
          title: "喜歡的內容",
          path: `/user/${this.userId}/like`,
        },
      ],
    };
  },
  //watch: {
  //  "$route.params.id": {
  //    handler: function (userId) {
  //      this.testId = userId
  //    },
  //    immediate: true,
  //  },
  //}
};
</script>

<style scoped>
ul {
  display: flex;
  height: 52px;
  align-items: center;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-top: 16px;
}
li {
  width: 130px;
  text-align: center;
  height: 100%;
  /* border: 1px solid #000; */
}
li > a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  position: relative;
}

li > a.active::after {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  border-bottom: 2px solid var(--main-color);
}
.nav-link {
  font-size: 15px;
  color: #657786;
  position: relative;
}
.router-link-exact-active {
  color: var(--main-color);
}
li .router-link-exact-active {
  border-bottom: var(--main-color) 2px solid;
}
</style>