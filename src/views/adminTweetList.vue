<template>
  <div class="wrap">
    <navigationAdmin />
    <div class="tweet-list">
      <div class="tweet-list-title">
        <h4>推文清單</h4>
      </div>
      <div class="tweet-list-warp">
        <div class="tweet-list-card">
          <div class="tweet-list-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-list-content">
            <div class="tweet-list-title">
              <div class="tweet-list-name-group">
                <p class="tweet-list-name"><b>Apple</b></p>
                <p class="tweet-list-account fz14">@apple・3 小時</p>
              </div>
              <div class="tweet-list-delete">
                <img src="../assets/images/tweet-list-delete.png" alt="" />
              </div>
            </div>
            <div class="tweet-list-text">
              <p>
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco fdfsdfscillum dolor. Voluptate exercitation incididunt
                aliquip deserunt reprehenderit elit laborum.
              </p>
            </div>
          </div>
        </div>
        <div class="tweet-list-card">
          <div class="tweet-list-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-list-content">
            <div class="tweet-list-title">
              <div class="tweet-list-name-group">
                <p class="tweet-list-name"><b>Apple</b></p>
                <p class="tweet-list-account fz14">@apple・3 小時</p>
              </div>
              <div class="tweet-list-delete">
                <img src="../assets/images/tweet-list-delete.png" alt="" />
              </div>
            </div>
            <div class="tweet-list-text">
              <p>
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco fdfsdfscillum dolor. Voluptate exercitation incididunt
                aliquip deserunt reprehenderit elit laborum.
              </p>
            </div>
          </div>
        </div>
        <div class="tweet-list-card">
          <div class="tweet-list-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-list-content">
            <div class="tweet-list-title">
              <div class="tweet-list-name-group">
                <p class="tweet-list-name"><b>Apple</b></p>
                <p class="tweet-list-account fz14">@apple・3 小時</p>
              </div>
              <div class="tweet-list-delete">
                <img src="../assets/images/tweet-list-delete.png" alt="" />
              </div>
            </div>
            <div class="tweet-list-text">
              <p>
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco fdfsdfscillum dolor. Voluptate exercitation incididunt
                aliquip deserunt reprehenderit elit laborum.
              </p>
            </div>
          </div>
        </div>
        <div class="tweet-list-card">
          <div class="tweet-list-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-list-content">
            <div class="tweet-list-title">
              <div class="tweet-list-name-group">
                <p class="tweet-list-name"><b>Apple</b></p>
                <p class="tweet-list-account fz14">@apple・3 小時</p>
              </div>
              <div class="tweet-list-delete">
                <img src="../assets/images/tweet-list-delete.png" alt="" />
              </div>
            </div>
            <div class="tweet-list-text">
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
  </div>
</template>
<script>
import navigationAdmin from "../components/navAdmin";

export default {
  name: "adminTweetList",
  components: {
    navigationAdmin,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="css" src="@/assets/css/adminTweetList.css" scoped></style>