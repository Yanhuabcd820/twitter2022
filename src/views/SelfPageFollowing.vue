<template>
  <div class="wrap">
    <navigation />
    <div class="main">
      <userTitle />
      <navTabsFollow />
      <div class="tweet-wrap">
        <div class="tweet-card">
          <div class="tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-title">
              <div class="tweet-name-group">
                <p class="tweet-name"><b>Apple</b></p>
                <div class="btn">正在跟隨</div>
              </div>
              
            </div>
            <div class="tweet-text">
              <p>
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco fdfsdfscillum dolor. Voluptate exercitation incididunt
                aliquip deserunt reprehenderit elit laborum.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <followTop />
  </div>
</template>
<script>
import navigation from "../components/nav";
import followTop from "../components/followTop";
import userTitle from "../components/userTitle.vue"
import navTabsFollow from "../components/navTabsFollow";

export default {
  name: "mainPage",
  components: {
    navigation,
    followTop,
    userTitle,
    navTabsFollow
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

<style scoped>
.tweet-name-group {
  display: flex;
  justify-content: space-between;
}

</style>
