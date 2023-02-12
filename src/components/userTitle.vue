<template>
  <div class="user-title">
    <img src="../assets/images/LeftArrow.png" alt="" @click="$router.go(-1)" />
    <div class="user-name">
      <h5>{{ userName }}</h5>
      <p>{{ tweetNum }}推文</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      required: true,
    },
    tweetNum: {
      type: Number,
      reqired: true,
    },
  },
};
</script>

<style scoped>
.user-title img {
  width: 17px;
  height: 14px;
  /* margin-left: 28px; */
  margin-right: 19px;
}
.user-title img:hover {
  cursor: pointer;
}
.user-title {
  display: flex;
  align-items: center;
  height: 75px;
}
</style>