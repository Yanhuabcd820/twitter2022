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
            <img :src="user.avatar | emptyImage" alt="" />
          </div>
          <textarea
            name="description"
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
          <div class="post-text-num-warning" v-if="noZero">不得為空白</div>
          <div
            type="submit"
            class="btn popupTweet-btn active"
            @click.prevent.stop="handleSubmit"
          >
            推文
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { emptyImageFilter } from "./../utils/mixins";
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
      isProcessing: false,
    };
  },
  watch: {
    popupText() {
      if (this.popupText) {
        this.noZero = false;
      }
    },
  },

  methods: {
    closePopupTweet() {
      this.$emit("close-PopupTweet", {
        isClickPopupReplyTweet: false,
      });
    },

    handleSubmit() {
      if (this.popupText.trim() >= 140) return;
      if (!this.popupText.trim()) {
        this.noZero = true;
        return;
      }
      this.$emit("after-create-tweet", {
        description: this.popupText,
      });
    },
  },
  mixins: [emptyImageFilter],
};
</script>


<style lang="css" src="@/assets/css/popupTweet.css" scoped></style>