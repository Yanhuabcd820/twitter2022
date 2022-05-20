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
            <img :src="currentUser.avatar | emptyImage" alt="" />
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
            @click.prevent.stop="afterCreateTweet"
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
import { mapState } from "vuex";
export default {
  name: "popupTweet",
  // props: {
  //   user: {
  //     type: Object,
  //     required: true,
  //   },
  // },
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

    async afterCreateTweet(payload) {
      try {
        const { description } = payload;
        const data = await tweetsApi.postTweets({ description });
        if (data.data.status !== "Success") {
          throw new Error(data.message);
        }
        const tweetId = data.data.data.tweet.id;
        this.tweets.unshift({
          description,
          id: tweetId,
          User: {
            id: this.user.id,
            account: this.user.account,
            name: this.user.name,
            avatar: this.user.avatar,
          },
          createdAt: new Date(),
          totalLikes: 0,
          totalReplies: 0,
        });
        /*關掉PopupTweet*/
        this.isClickPopupTweet = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆tweet",
        });
      }
    },
  },
  mixins: [emptyImageFilter],
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>


<style lang="css" src="@/assets/css/popupTweet.css" scoped></style>