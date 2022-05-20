<template>
  <div class="popupReply-wrap">
    <div class="overlay" @click.stop.prevent="closePopupReply"></div>
    <div class="popupReply">
      <div class="popupReply-colse">
        <div class="popupReply-colse-img" @click.stop.prevent="closePopupReply">
          <img src="../assets/images/pop-up-cancle.png" alt="" />
        </div>
      </div>
      <div class="popupReply-text-wrap">
        <div class="popupReply-user">
          <div class="popupReply-avatar">
            <div class="popupReply-avatar-img">
              <img :src="user.avatar | emptyImage" alt="" />
            </div>
          </div>
          <div class="popupReply-content">
            <div class="popupReply-name-group">
              <p class="popupReply-name">
                <b>{{ user.name }}</b>
              </p>
              <p class="popupReply-account fz14">
                @{{ user.account }}・{{ tweet.createdAt | fromNow }}
              </p>
            </div>
            <div class="popupReply-text">
              <p>
                {{ tweet.description }}
              </p>

              <p class="reply-to fz14"><span>回覆</span> @{{ user.name }}</p>
            </div>
          </div>
        </div>
        <div class="popupReply-again-inner">
          <div class="popupReply-again-avatar">
            <img :src="user.avatar | emptyImage" alt="" />
          </div>
          <textarea
            name=""
            id=""
            maxlength="80"
            placeholder="推你的回覆"
            v-model="popupText"
          ></textarea>
        </div>
        <div class="popupReply-btn-wrap">
          <div class="post-text-num-warning" v-if="popupText.length >= 80">
            字數不可超過 80 字
          </div>
          <div class="post-text-num-warning" v-if="noZero">不得為空白</div>
          <div
            class="btn popupReply-btn active"
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
// import { v4 as uuidv4 } from "uuid";
import { fromNowFilter, emptyImageFilter } from "./../utils/mixins";
export default {
  name: "popupReply",
  props: {
    tweet: {
      type: Object,
      required: true,
    },
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
  watch: {
    popupText() {
      if (this.popupText) {
        this.noZero = false;
      }
    },
  },
  methods: {
    closePopupReply() {
      this.$emit("close-PopupReply", {
        isClickPopupReplyTweet: false,
      });
    },

    handleSubmit() {
      if (!this.popupText.trim()) {
        this.noZero = true;
        return;
      }
      this.$emit("after-create-reply", {
        tweetId: this.tweet.id,
        comment: this.popupText,
      });

      // const { id: userId } = this.$route.params;
      // const getPath = this.$route.path;
      // console.log("getPath", getPath);

      // const tt = this.$route.params;

      // if (getPath === `/user/${tt}/like`) {
      //   console.log(111);
      //   this.$emit("after-create-reply", {
      //     tweetId: this.tweet.TweetId,
      //     comment: this.popupText,
      //   });
      // } else {
      //   console.log(222);
      //   this.$emit("after-create-reply", {
      //     tweetId: this.tweet.Id,
      //     comment: this.popupText,
      //   });
      // }
    },
  },

  mixins: [fromNowFilter, emptyImageFilter],
};
</script>


<style lang="css" src="@/assets/css/popupReply.css" scoped></style>