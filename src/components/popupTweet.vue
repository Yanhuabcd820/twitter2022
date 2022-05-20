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
            @click.prevent.stop="createTweet(popupText)"
          >
            推文
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tweetsApi from "./../apis/tweets";
import { emptyImageFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
export default {
  name: "popupTweet",
  props: {
    // user: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      tweets: [],
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
    async featchTweets() {
      try {
        // 取得tweets資料
        console.log(123);
        const responesTweets = await tweetsApi.getTweets();
        const { tweets } = responesTweets.data.data;
        this.tweets = tweets;
        // console.log("tweets", this.tweets);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得tweets資料，請稍後再試"
        });
      }
    },
    closePopupTweet() {
      this.$emit("close-PopupTweet", {
        isClickPopupReplyTweet: false,
      });
    },

    async createTweet(description) {
      try {
        if (this.popupText.trim().length >= 140) {
          return;
        }
        if (!this.popupText.trim()) {
          this.noZero = true;
          return;
        }
        const getPath = this.$route.path;
        console.log("getPath", getPath);
        if (getPath === "/tweets") {
          // 如果目前在tweets就要用傳送資料的方式新增tweet
          this.$emit("after-create-tweet", {
            description: this.popupText,
          });
          this.$emit("close-PopupTweet", {
            isClickPopupReplyTweet: false,
          });
        } else {
          // 如果目前在userPage或setting就直接在原地新增資料後轉址到tweets
          const data = await tweetsApi.postTweets({ description });
          console.log(data);
          if (data.data.status !== "Success") {
            throw new Error(data.message);
          }
          // 成功登入後轉址到餐廳首頁
          this.$router.push("/tweets");
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆tweet",
        });
      }
    },
  },
  created() {
    this.featchTweets();
  },
  mixins: [emptyImageFilter],
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>


<style lang="css" src="@/assets/css/popupTweet.css" scoped></style>