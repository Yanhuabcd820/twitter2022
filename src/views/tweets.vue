<template>
  <div class="wrap">
    <popupTweet
      v-if="isClickPopupTweet"
      @close-PopupTweet="closePopupTweet"
      @after-create-tweet="afterCreateTweet"
      :user="user"
      @after-open-tweet="afterOpenTweet"
    />
    <navigation @after-open-tweet="afterOpenTweet" />
    <div class="main">
      <div class="user-title">
        <h4>首頁</h4>
      </div>
      <div class="post">
        <div class="post-inner">
          <router-link to="/user/1" class="post-avatar">
            <img :src="user.avatar" alt="" />
          </router-link>
        </div>
        <div class="post-inner-tweet" @click.prevent.stop="openPopupTweet">
          <h5>有什麼新鮮事？</h5>
          <div class="post-inner-btn">
            <div class="btn active">推文</div>
          </div>
        </div>
      </div>
      <popupReply
        v-if="isClickPopupReplyTweet"
        @close-PopupReply="closePopupReply"
        :tweet="tweetPopup"
        :user="user"
        @after-create-reply="afterCreateReply"
      />
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="tweet in tweets" :key="tweet.id">
          <router-link
            :to="{ name: 'SelfPage', params: { id: tweet.User.id } }"
            class="tweet-avatar"
          >
            <img :src="tweet.User.avatar" alt="" />
          </router-link>
          <router-link
            :to="{ name: 'tweet', params: { id: tweet.id } }"
            class="tweet-content"
          >
            <router-link
              :to="{ name: 'SelfPage', params: { id: tweet.User.id } }"
              class="tweet-name-group"
            >
              <p class="tweet-name">
                <b>{{ tweet.User.name }}</b>
              </p>
              <p class="tweet-account fz14">
                @{{ tweet.User.account }}・{{ tweet.createdAt | fromNow }}
              </p>
            </router-link>
            <div class="tweet-text">
              <p>
                {{ tweet.description }}
              </p>
            </div>
            <div class="tweet-count">
              <div
                class="tweet-reply"
                @click.prevent.stop="openPopupReply(tweet.id)"
              >
                <div class="tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14">
                  <b>
                    <b>{{ tweet.totalReplies }}</b></b
                  >
                </p>
              </div>
              <div
                class="tweet-like"
                v-if="!tweet.isLiked"
                @click.prevent.stop="addLike(tweet.id)"
              >
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.totalLikes }}</b>
                </p>
              </div>
              <div
                class="tweet-like"
                v-if="tweet.isLiked"
                @click.prevent.stop="unLike(tweet.id)"
              >
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like-active.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.totalLikes }}</b>
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <followTop />
  </div>
</template>
<script>
const dummyUser = {
  status: "success",
  user: {
    id: 1,
    account: "user1",
    name: "user1",
    email: "user1@example.com",
    password: "$2a$10$DRteVVsafLSZdoetjOpfdeSYGf3t5SuswRL3sRrSvdGpS3ACmU5NG",
    role: "user",
    introduction: "Deleniti est id inventore.",
    avatar: "https://loremflickr.com/320/240/people/?random=73.0908396968221",
    cover:
      "https://loremflickr.com/320/240/restaurant,food/?random=79.46570629965461",
    createdAt: "2022-05-13T15:55:16.000Z",
    updatedAt: "2022-05-13T15:55:16.000Z",
  },
};

// import { mapState } from "vuex";
import { fromNowFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import navigation from "./../components/nav";
import followTop from "./../components/followTop";
import popupTweet from "./../components/popupTweet";
import popupReply from "./../components/popupReply";
import tweetsApi from "./../apis/tweets";
import userApi from "./../apis/user";

export default {
  name: "mainPage",
  components: {
    navigation,
    followTop,
    popupTweet,
    popupReply,
  },
  // computed: {
  //   ...mapState(["currentUser"]),
  // },
  data() {
    return {
      user: dummyUser.user,
      // currentUser: {},
      tweets: [],
      replies: [],
      isClickPopupTweet: false,
      isClickPopupReplyTweet: false,
      // whichPopupReply: -1,
      tweet: {},
      tweetPopup: {},
      TweetsRepliesNum: {},
    };
  },
  methods: {
    // async featchCurrentUser() {
    //   try {
    //     // 取得tweets資料
    //     const currentUser = await tweetsApi.getCurrentUser();
    //     // const { tweets } = responesTweets.data.data;
    //     // this.tweets = tweets;
    //     console.log(currentUser);
    //   } catch (error) {
    //     Toast.fire({
    //       icon: "error",
    //       title: "無法取得tweets資料，請稍後再試",
    //     });
    //   }
    // },
    async featchTweets() {
      try {
        // 取得tweets資料
        const responesTweets = await tweetsApi.getTweets();
        const { tweets } = responesTweets.data.data;
        this.tweets = tweets;
        // console.log(this.tweets);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得tweets資料，請稍後再試",
        });
      }
    },
    // async featchTweetsReplies() {
    //   try {
    //     // 取得tweets資料
    //     const responesTweets = await tweetsApi.getTweetsReply();
    //     const { tweets } = responesTweets.data.data;
    //     this.tweets = tweets;
    //     // console.log(this.tweets);
    //   } catch (error) {
    //     Toast.fire({
    //       icon: "error",
    //       title: "無法取得tweets資料，請稍後再試",
    //     });
    //   }
    // },
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
    async afterCreateReply(payload) {
      try {
        const { comment, tweetId } = payload;
        const data = await tweetsApi.postTweetsReply({
          comment,
          tweetId,
        });
        if (data.data.status !== "Success") {
          throw new Error(data.message);
        }
        console.log("data", data);
        this.replies.unshift({
          comment,
          id: tweetId,
          User: {
            id: this.user.id,
            account: this.user.account,
            name: this.user.name,
            avatar: this.user.avatar,
          },
          createdAt: new Date(),
        });

        // 成功的話則轉址到 `/tweets/:id`
        this.$router.push({ name: "tweet", params: { id: tweetId } });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆tweetReply",
        });
      }
    },

    async addLike(tweetId) {
      try {
        const dataLike = await userApi.addLike({ tweetId });
        if (dataLike.data.status !== "Success") {
          throw new Error(dataLike.data.message);
        }
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              isLiked: true,
              totalLikes: tweet.totalLikes + 1,
            };
          }
          return tweet;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法like此筆tweet，請稍後再試",
        });
      }
    },
    async unLike(tweetId) {
      try {
        const dataUnLike = await userApi.unLike({ tweetId });

        if (dataUnLike.data.status !== "Success") {
          throw new Error(dataUnLike.data.message);
        }
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              isLiked: false,
              totalLikes: tweet.totalLikes - 1,
            };
          }
          return tweet;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法unlike此筆tweet，請稍後再試",
        });
      }
    },
    afterOpenTweet(payload) {
      //將彈跳視窗打開

      console.log(payload);
      const { isClickPopupTweet } = payload;
      console.log(isClickPopupTweet);
      this.isClickPopupTweet = isClickPopupTweet;
    },
    openPopupTweet() {
      //將彈跳視窗打開
      this.isClickPopupTweet = true;
    },
    closePopupTweet(payloadPopup) {
      //將彈跳視窗關閉
      const { isClickPopupTweet } = payloadPopup;
      this.isClickPopupTweet = isClickPopupTweet;
    },

    openPopupReply(tweetId) {
      this.tweetPopup = this.tweets.find((tweet) => tweet.id === tweetId);
      this.isClickPopupReplyTweet = true;
    },
    closePopupReply(payloadPopupReply) {
      const { isClickPopupReplyTweet } = payloadPopupReply;
      this.isClickPopupReplyTweet = isClickPopupReplyTweet;
    },
  },
  created() {
    // this.featchCurrentUser();
    this.featchTweets();
  },
  mixins: [fromNowFilter],
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>


