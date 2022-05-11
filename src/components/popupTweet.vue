<template>
  <div class="popupTweet-wrap">
    <div class="overlay" @click.stop.prevent="closePopupTweet"></div>
    <div class="popupTweet">
      <div class="popupTweet-colse">
        <div class="popupTweet-colse-img" @click.stop.prevent="closePopupTweet">
          <img src="../assets/images/pop-up-cancle.png" alt="" />
        </div>
      </div>
      <div class="popupTweet-text-wrap">
        <div class="popupTweet-text">
          <div class="popupTweet-avatar">
            <img src="../assets/images/avatar.png" alt="" />
          </div>
          <textarea
            name=""
            id=""
            maxlength="140"
            placeholder="有什麼新鮮事？"
            v-model="popupText"
          ></textarea>
        </div>
        <div class="popupTweet-btn-wrap">
          <div class="post-text-num-warning" v-if="popupText.length >= 140">
            字數不可超過 140 字
          </div>
          <div class="btn popupTweet-btn active">推文</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "popupTweet",
  data() {
    return {
      popupText: "",
    };
  },
  methods: {
    closePopupTweet() {
      this.$emit("close-PopupTweet", {
        isClickPopupTweet: false,
      });
    },
  },
};
</script>


<style lang="css" src="@/assets/css/popupTweet.css" scoped></style>