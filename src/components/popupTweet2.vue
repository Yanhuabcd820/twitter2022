<template>
  <form class="popupTweet-wrap" @submit.prevent.stop="handleSubmit">
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
            <img :src="user.avatar" alt="" />
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
          <div class="post-text-num-warning" v-if="popupText.length <= 0">
            不得為空白
          </div>
          <button type="submit" class="btn popupTweet-btn active">推文</button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
// import { v4 as uuidv4 } from "uuid";
export default {
  name: "popupTweet",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      popupText: "",
      noZero: false,
    };
  },

  methods: {
    closePopupTweet() {
      this.$emit("close-PopupTweet", {
        isClickPopupReplyTweet: false,
      });
    },
    handleSubmit(e) {
      console.log("handleSubmitFORM");

      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-create-tweet", formData);

      // if (!this.popupText.trim()) {
      //   this.noZero = true;
      //   return;
      // }
      // this.$emit("after-create-tweet", {
      //   tweetId: uuidv4(),
      //   tweetText: this.popupText,
      // });
      // this.popupText = "";
    },
    // handleSubmit() {
    //   console.log("handleSubmit");
    //   if (!this.popupText.trim()) {
    //     this.noZero = true;
    //     return;
    //   }
    //   this.$emit("after-create-tweet", {
    //     tweetId: uuidv4(),
    //     tweetText: this.popupText,
    //   });
    //   this.popupText = "";
    // },
  },
};
</script>


<style lang="css" src="@/assets/css/popupTweet.css" scoped></style>